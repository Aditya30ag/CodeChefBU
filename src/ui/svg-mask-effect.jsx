"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Update mouse position
  const updateMousePosition = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust 768px to whatever breakpoint works for you
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    containerRef.current.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);

  let maskSize = isHovered ? revealSize : size;

  // If on mobile, reduce mask size
  if (isMobile) {
    maskSize = Math.min(maskSize, revealSize / 2); // Adjust the mask size further for mobile
  }

  // Adjust brightness for mobile
  const brightnessFilter = isMobile ? "brightness(0.1)" : "brightness(1)"; // Reduce brightness on mobile

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-screen", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}>
      <motion.div
        className="absolute flex h-full min-w-screen items-center justify-center bg-black text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-white"
        animate={{
          maskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.15, ease: "linear" },
        }}>
        <div 
          className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" 
          style={{ filter: brightnessFilter }} // Apply brightness adjustment
        />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold">
          {children}
        </div>
      </motion.div>
      <div className="flex h-full w-screen items-center justify-center">
        {revealText}
      </div>
    </motion.div>
  );
};
