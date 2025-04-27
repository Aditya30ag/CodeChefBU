"use client";
import { useEffect, useState } from "react";

export function SVGMaskEffectDemo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    const throttledMouseMove = (e) => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          handleMouseMove(e);
          animationFrameId = null;
        });
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-8">
      <div className="relative mx-auto max-w-full sm:max-w-5xl">
        {/* Base text layer */}
        <p className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent">
          <span className="bg-clip-text bg-white">
          Code, Compete, Conquer: Empowering Innovators at 
            <br />
            Bennett University through Competitive Programming
          </span>
        </p>

        {/* 3D highlight layer */}
        <p
          className="absolute inset-0 text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.2)",
            maskImage: `linear-gradient(${mousePosition.x}deg, transparent 25%, white 50%, transparent 75%)`,
            WebkitMaskImage: `linear-gradient(${mousePosition.x}deg, transparent 25%, white 50%, transparent 75%)`,
            transform: `perspective(1200px) rotateX(${(mousePosition.y - 50) / 10}deg) rotateY(${(mousePosition.x - 50) / 10}deg)`,
            textShadow:
              "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)",
          }}
        >
         Code, Compete, Conquer: Empowering Innovators at 
          <br />
          Bennett University through Competitive Programming
        </p>
      </div>
    </div>
  );
}
