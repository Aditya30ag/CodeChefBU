import React, { useState, useEffect } from "react";
import { Vortex } from "../ui/vortex";
import { SVGMaskEffectDemo } from "./SVGMaskEffectDemo";

export function VortexDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is mobile size
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile screens
    };

    // Check initially
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <>
      {/* Conditionally render based on screen size */}
      {!isMobile ? (
        // Desktop/Laptop View - Upper part with Vortex
        <div className="w-screen mx-auto rounded-md h-[30rem] overflow-hidden">
          <Vortex
            backgroundColor="black"
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            <SVGMaskEffectDemo />
          </Vortex>
        </div>
      ) : (
        // Mobile View - Lower part without Vortex
        <div className="w-screen mx-auto rounded-md h-[30rem] overflow-hidden">
          <div className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
            <SVGMaskEffectDemo />
          </div>
        </div>
      )}
    </>
  );
}