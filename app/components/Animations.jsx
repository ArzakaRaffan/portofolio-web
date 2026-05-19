"use client";
import React from "react";

// Reveal — fades + slides content in once it scrolls into view.
// Designed to be light: no library, just an IntersectionObserver.
function Reveal({ children, delay = 0, y = 24, scale = 1, once = true, as: Tag = "div", style }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // If user prefers reduced motion, show immediately.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(e.target);
        } else if (!once) {
          setVisible(false);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    obs.observe(node);
    return () => obs.disconnect();
  }, [once]);

  return (
    <Tag ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible
        ? "translate3d(0,0,0) scale(1)"
        : `translate3d(0,${y}px,0) scale(${scale})`,
      transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      willChange: "opacity, transform",
      ...style,
    }}>
      {children}
    </Tag>
  );
}

export { Reveal };