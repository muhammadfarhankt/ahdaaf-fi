"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // White base
      markerColor: [0.1, 0.8, 0.8],
      glowColor: [0.8, 0.9, 0.9], // Light glow
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003; // Slow rotation
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
        }}
      />
    </div>
  );
};

