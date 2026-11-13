"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ae_loaded")) {
      setVisible(false);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("ae_loaded", "1");
            document.body.style.overflow = "";
          }, 450);
        }, 150);
      }
    }

    requestAnimationFrame(step);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#fff",
        opacity: leaving ? 0 : 1,
        transition: leaving ? "opacity 0.45s ease" : "none",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {/* Center progress bar */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "160px",
          height: "2px",
          background: "rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "rgba(0,0,0,0.7)",
            transition: "width 0.06s linear",
          }}
        />
      </div>
    </div>
  );
}
