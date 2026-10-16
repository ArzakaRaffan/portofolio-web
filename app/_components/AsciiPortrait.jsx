"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./ui";

const RAMP = "@%#*+=-:. "; // dark → light
const CELL_PX = 3.2; // target glyph width; ~160 columns on desktop, fewer on narrow screens
const CELL = 0.6; // monospace glyph width / height
const FOCUS_Y = 0.3; // matches the photo's object-[center_30%]
const SHARPEN = 2; // unsharp-mask amount...
const RADIUS = 3; // ...over a 7×7 neighbourhood: brings out glasses, hair, folded arms
const GAMMA = 1.8; // after equalisation; keeps skin in light glyphs instead of blank
const DEPTH = 0.3; // nearest point sits this fraction of the panel width in front of the wall
const FOCAL = 3; // camera distance, in panel widths
const TURN = [0.3, 0.18]; // max yaw / pitch (rad) at the panel edges
const ASSEMBLE_MS = 2200;
const INK = [[14 / 255, 14 / 255, 14 / 255], [1, 77 / 255, 0]]; // settled #0E0E0E, in flight #FF4D00

// Each glyph is a point sprite: assemble from its scatter offset, turn about the
// pivot, perspective-project, then sample its glyph from the atlas.
const VERT = `
attribute vec3 aPos; attribute vec3 aScat; attribute vec2 aMeta;
uniform float uT, uSize; uniform vec2 uRot, uHalf; uniform vec4 uCam;
varying float vG, vHot, vA;
void main() {
  float p = clamp((uT - aMeta.y) / (1.0 - aMeta.y), 0.0, 1.0);
  p = 1.0 - pow(1.0 - p, 4.0);
  float q = 1.0 - p;
  vec3 P = vec3(aPos.xy + aScat.xy * q, aPos.z * uCam.x - uCam.z - aScat.z * q);
  float cy = cos(uRot.x), sy = sin(uRot.x), cx = cos(uRot.y), sx = sin(uRot.y);
  float x1 = P.x * cy + P.z * sy, z1 = P.z * cy - P.x * sy;
  float y2 = P.y * cx - z1 * sx, z2 = z1 * cx + P.y * sx + uCam.z;
  float s = uCam.y / (uCam.y - z2) * uCam.w;
  if (s <= 0.0 || s > 6.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); gl_PointSize = 0.0; return; }
  gl_Position = vec4(x1 * s / uHalf.x, -y2 * s / uHalf.y, 0.0, 1.0);
  gl_PointSize = uSize * s;
  vG = aMeta.x;
  vHot = 1.0 - step(0.85, p);
  vA = (0.35 + p * 0.65) * (0.75 + 0.25 * aPos.z); // room glyphs sit back a little
}`;
const FRAG = `
precision mediump float;
uniform sampler2D uAtlas; uniform float uN; uniform vec3 uInk, uHot;
varying float vG, vHot, vA;
void main() {
  float a = texture2D(uAtlas, vec2((vG + gl_PointCoord.x) / uN, gl_PointCoord.y)).a * vA;
  if (a < 0.01) discard;
  gl_FragColor = vec4(mix(uInk, uHot, vHot) * a, a);
}`;

function program(gl) {
  const p = gl.createProgram();
  [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]].forEach(([type, code]) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, code);
    gl.compileShader(s);
    gl.attachShader(p, s);
  });
  gl.linkProgram(p);
  return p;
}

/**
 * Portrait as a 3D ASCII relief: every glyph sits at a depth read from `depth`
 * (subject in front, room behind; see scripts/portrait-depth.py) and the point
 * cloud turns toward the cursor with real perspective. Glyphs assemble from a
 * scattered cloud on first view. A click flips between ASCII and photo (re-assembling on return).
 */
export function AsciiPortrait({ src, depth, alt }) {
  const wrap = useRef(null);
  const cvRef = useRef(null);
  const [photo, setPhoto] = useState(false);
  const assemble = useRef({ t: 0, from: 0 });

  useEffect(() => {
    const cv = cvRef.current;
    // WebGL: ~20k glyphs re-projected every frame is one draw call here; on a 2D canvas it was ~75ms/frame.
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: true });
    if (!gl) { setPhoto(true); return; }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let count = 0, cols = 0, rows = 0, w = 0, h = 0, size = 0, raf = 0, visible = false, started = false;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    const prog = program(gl);
    const U = (n) => gl.getUniformLocation(prog, n);
    const buf = gl.createBuffer();
    const tex = gl.createTexture();
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    [["aPos", 3, 0], ["aScat", 3, 3], ["aMeta", 2, 6]].forEach(([n, k, at]) => {
      const loc = gl.getAttribLocation(prog, n);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, k, gl.FLOAT, false, 32, at * 4);
    });
    gl.uniform1f(U("uN"), RAMP.length);
    gl.uniform3fv(U("uInk"), INK[0]);
    gl.uniform3fv(U("uHot"), INK[1]);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const img = new Image();
    img.src = src;
    const dimg = new Image();
    dimg.src = depth;
    const off = document.createElement("canvas");
    const o = off.getContext("2d", { willReadFrequently: true });

    // Sample the photo (and depth map) into the grid, cropped exactly like the <img>
    // (object-cover, FOCUS_Y), so relief and photo line up when toggling.
    const build = () => {
      if (!img.naturalWidth || !dimg.naturalWidth || !w) return;
      cols = Math.max(60, Math.min(170, Math.round(w / CELL_PX)));
      rows = Math.round(cols * (h / w) * CELL);
      const crop = (im) => {
        const s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
        o.drawImage(im, (im.naturalWidth - w / s) / 2, (im.naturalHeight - h / s) * FOCUS_Y, w / s, h / s, 0, 0, cols, rows);
        return o.getImageData(0, 0, cols, rows).data;
      };
      off.width = cols; off.height = rows;
      o.imageSmoothingQuality = "high";
      const data = crop(img), zmap = crop(dimg);
      const N = cols * rows;
      const lum = new Float32Array(N);
      for (let k = 0; k < N; k++) lum[k] = (0.299 * data[k * 4] + 0.587 * data[k * 4 + 1] + 0.114 * data[k * 4 + 2]) / 255;
      const sharp = lum.map((v, k) => {
        const i = k % cols, j = (k / cols) | 0;
        let sum = 0, n = 0;
        for (let dj = -RADIUS; dj <= RADIUS; dj++) for (let di = -RADIUS; di <= RADIUS; di++) {
          const ii = i + di, jj = j + dj;
          if (ii >= 0 && ii < cols && jj >= 0 && jj < rows) { sum += lum[jj * cols + ii]; n++; }
        }
        return v + SHARPEN * (v - sum / n);
      });
      // Histogram equalisation: the busy brick/ceiling background can't hog the dark end of the ramp.
      const sorted = Float32Array.from(sharp).sort();
      const rank = (v) => { let l = 0, r = N; while (l < r) { const m = (l + r) >> 1; if (sorted[m] < v) l = m + 1; else r = m; } return l / N; };
      const cw = w / cols, ch = h / rows;
      const cells = [];
      sharp.forEach((v, k) => {
        const g = Math.min(RAMP.length - 1, Math.floor(Math.pow(rank(v), GAMMA) * RAMP.length));
        if (RAMP[g] === " ") return;
        // [x, y, depth, scatter x/y/z, glyph, assemble delay]
        cells.push([((k % cols) + 0.5) * cw - w / 2, (((k / cols) | 0) + 0.5) * ch - h / 2, zmap[k * 4] / 255,
          (Math.random() - 0.5) * 900, (Math.random() - 0.5) * 900, (Math.random() - 0.5) * 1400, g, Math.random() * 0.35]);
      });
      cells.sort((a, b) => a[2] - b[2]); // far → near, so the subject paints over the room
      count = cells.length;
      gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(cells.flat()), gl.STATIC_DRAW);

      // Glyph atlas: one square cell per ramp glyph, white; the shader tints it.
      const dpr = Math.min(devicePixelRatio || 1, 2);
      size = ch * 1.2 * dpr;
      const C = Math.ceil(size * 1.25); // headroom for glyphs scaled up by perspective
      const atlas = document.createElement("canvas");
      atlas.width = C * RAMP.length; atlas.height = C;
      const a = atlas.getContext("2d");
      a.font = `${C / 1.5}px ui-monospace, monospace`;
      a.textAlign = "center"; a.textBaseline = "middle"; a.fillStyle = "#fff";
      for (let g = 0; g < RAMP.length; g++) a.fillText(RAMP[g], (g + 0.5) * C, C / 2);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      gl.viewport(0, 0, cv.width, cv.height);
      build();
    };

    const draw = (time) => {
      if (!count) return;
      const t = reduce ? 0 : time / 1000;
      const a = assemble.current;
      if (a.start == null) a.start = time;
      a.t = Math.min(1, (time - a.start) / ASSEMBLE_MS);
      tilt.x += (tilt.tx - tilt.x) * 0.08;
      tilt.y += (tilt.ty - tilt.y) * 0.08;
      // Slow idle sway so the depth reads without a cursor (touch screens too).
      const ry = tilt.x * TURN[0] + Math.sin(t * 0.6) * 0.09;
      const rx = -tilt.y * TURN[1] + Math.cos(t * 0.5) * 0.03;
      gl.uniform1f(U("uT"), a.t);
      gl.uniform2f(U("uRot"), ry, rx);
      gl.uniform2f(U("uHalf"), w / 2, h / 2);
      // Depth, camera distance, pivot (mid-relief), and a slight zoom as it turns so the room never shows its edges.
      gl.uniform4f(U("uCam"), w * DEPTH, w * FOCAL, (w * DEPTH) / 2, 1 + 0.18 * Math.min(1, Math.abs(ry) / TURN[0] + Math.abs(rx) / TURN[1]));
      gl.uniform1f(U("uSize"), size);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    // onload, not decode(): decode() can stall in background tabs.
    Promise.all([img, dimg].map((im) => new Promise((ok, fail) => { im.onload = ok; im.onerror = fail; }))).then(() => {
      resize();
      if (reduce) { assemble.current = { start: -1e9 }; draw(0); }
      // The panel may have scrolled into view while the images were still decoding.
      else if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    }, () => {});

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !started) { started = true; assemble.current = { t: 0 }; }
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }, { threshold: 0.2 });
    io.observe(cv);

    const host = wrap.current;
    const move = (e) => {
      const b = host.getBoundingClientRect();
      tilt.tx = ((e.clientX - b.left) / b.width - 0.5) * 2;
      tilt.ty = ((e.clientY - b.top) / b.height - 0.5) * 2;
    };
    const leave = () => { tilt.tx = tilt.ty = 0; };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      removeEventListener("resize", resize);
    };
  }, [src, depth]);

  const toggle = () => {
    setPhoto((p) => {
      if (p) assemble.current = { t: 0 }; // rebuild the relief when returning to it
      return !p;
    });
  };

  return (
    <button
      ref={wrap}
      type="button"
      onClick={toggle}
      aria-pressed={photo}
      aria-label={photo ? "Show ASCII portrait" : "Show photo"}
      data-cursor="native"
      className="group relative block h-full w-full cursor-crosshair overflow-hidden text-left"
    >
      <canvas ref={cvRef} className="absolute inset-0 h-full w-full" role="img" aria-label={`${alt}, rendered as ASCII`} />
      <AnimatePresence>
        {photo && (
          <motion.img
            key="photo"
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)", transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        )}
      </AnimatePresence>
      <span className="label absolute bottom-3 left-3 z-10 bg-paper px-1.5 py-0.5">
        Fig. 01 — {photo ? "Photo" : "ASCII relief"}
      </span>
      <span className="label absolute right-3 top-3 z-10 bg-paper px-1.5 py-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Click to {photo ? "rebuild" : "reveal"}
      </span>
    </button>
  );
}
