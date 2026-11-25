"use client";

import { useEffect, useRef, useState } from "react";

// Background video for the home hero (public/videos/uae.mp4). Falls back to the tinted backdrop.
export default function HeroVideo({ src = "/videos/uae.mp4" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
    v.play?.().catch(() => {});
    if (v.readyState >= 2) setReady(true);
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      {!broken && (
        <video ref={ref} className={`hero-video ${ready ? "is-ready" : ""}`} autoPlay muted loop playsInline preload="metadata"
          onLoadedData={() => setReady(true)} onError={() => setBroken(true)}>
          <source src={src} type="video/mp4" onError={() => setBroken(true)} />
        </video>
      )}
      <div className="hero-tint" />
    </div>
  );
}
