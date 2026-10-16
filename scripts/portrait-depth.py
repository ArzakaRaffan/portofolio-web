"""Depth map for the 3D ASCII portrait: python scripts/portrait-depth.py
GrabCut cuts the subject from the brick wall; the subject gets a rounded bulge
(distance transform), the room is a simple box. White = near. Re-run if portrait.jpeg changes."""
import cv2, numpy as np

SRC, OUT, W = "public/assets/portrait.jpeg", "public/assets/portrait-depth.png", 400
img = cv2.imread(SRC)
h0, w0 = img.shape[:2]
small = cv2.resize(img, (W, round(h0 * W / w0)), interpolation=cv2.INTER_AREA)
H = small.shape[0]
# Subject box in source pixels (person stands centred, head ~y515 to feet at the bottom edge).
x0, y0, x1 = 280, 500, 730
rect = (round(x0 * W / w0), round(y0 * W / w0), round((x1 - x0) * W / w0), H - round(y0 * W / w0) - 1)
mask = np.zeros((H, W), np.uint8)
cv2.grabCut(small, mask, rect, np.zeros((1, 65)), np.zeros((1, 65)), 8, cv2.GC_INIT_WITH_RECT)
fg = np.isin(mask, (cv2.GC_FGD, cv2.GC_PR_FGD)).astype(np.uint8)
# Keep the largest blob, close small holes.
n, lab, stats, _ = cv2.connectedComponentsWithStats(fg)
fg = (lab == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
dist = cv2.distanceTransform(fg, cv2.DIST_L2, 5)
bulge = np.sqrt(dist / dist.max())
# Room box: wall flat at the back, ceiling (above y=34%) and floor (below y=78%) slope toward the camera.
y = np.linspace(0, 1, H)[:, None] * np.ones((1, W))
room = np.maximum(0.35 * np.clip((0.34 - y) / 0.34, 0, 1), 0.3 * np.clip((y - 0.78) / 0.22, 0, 1))
depth = np.where(fg > 0, 0.55 + 0.45 * bulge, room).astype(np.float32)
depth = cv2.GaussianBlur(depth, (0, 0), 2.5)
cv2.imwrite(OUT, np.clip(depth * 255, 0, 255).astype(np.uint8))
print(OUT, depth.shape, f"subject {fg.mean():.0%} of frame")
