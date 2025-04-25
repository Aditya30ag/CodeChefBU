import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { TextGenerateEffectDemo } from "./TextGenerateEffectDemo";
import { ParallaxScrollDemo } from "./ParallaxScrollDemo";
import { VortexDemo } from "./VortexDemo";
import SlidingPanel, { GetSetComponent } from "./GetSetComponent";

export function GridBackgroundDemo() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Enhanced shooting stars CSS with thinner bottom and lighter top
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
@keyframes shootingStar {
    0% {
        transform: translate(0, 0) rotate(135deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    100% {
        transform: translate(-100vw, 100vh) rotate(135deg);
        opacity: 0;
    }
}



.shooting-star-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 50;
}


.shooting-star {
    position: absolute;
    width: 4px;  /* Increased size */
    height: 4px; /* Increased size */
    background: rgba(255, 255, 255, 0.9); /* Brighter base color */
    border-radius: 50%;
    z-index: 50;
    box-shadow:
        0 0 10px rgba(255, 255, 255, 0.8),      /* Brighter, larger glow */
        0 0 20px rgba(150, 240, 255, 0.6),      /* Lighter blue glow */
        0 0 30px rgba(150, 240, 255, 0.4);      /* Faded blue glow */
}

.shooting-star::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 80px;    /* Longer tail */
    height: 1px;
    background: linear-gradient(270deg, 
        rgba(255, 255, 255, 1), 
        rgba(255, 255, 255, 0.7) 40%, 
        rgba(255, 255, 255, 0.4) 70%, 
        transparent);
    transform: translateY(-50%) rotate(180deg);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 40%);
}


.star-1 {
    top: 10%;
    right: -60px;
    animation: shootingStar 6s linear infinite;
    animation-delay: 0s;
}
.star-2 {
    top: 30%;
    right: -60px;
    animation: shootingStar 7s linear infinite;
    animation-delay: 2s;
}
.star-3 {
    top: 20%;
    right: -60px;
    animation: shootingStar 5s linear infinite;
    animation-delay: 4s;
}
.star-4 {
    top: 40%;
    right: -60px;
    animation: shootingStar 8s linear infinite;
    animation-delay: 3s;
}
.star-7 {
    top: 50%;
    right: -60px;
    animation: shootingStar 9s linear infinite;
    animation-delay: 1s;
}
.star-8 {
    top: 35%;
    right: -70px;
    animation: shootingStar 6s linear infinite;
    animation-delay: 5s;
}
.star-9 {
    top: 60%;
    right: -80px;
    animation: shootingStar 7s linear infinite;
    animation-delay: 4s;
}
.star-10 {
    top: 45%;
    right: -75px;
    animation: shootingStar 6s linear infinite;
    animation-delay: 2s;
}

@keyframes movingLight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 40px 40px; /* Adjust the final position based on your grid size */
    }
}

.animate-movingLight {
    animation: movingLight 2s linear infinite; /* Adjust the speed and direction as needed */
}

 @keyframes moveSnake {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 40px 40px;
    }
    100% {
      background-position: 0 0;
    }
  }

`;

        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            <div
                className="relative -top-20 flex h-[46rem] min-w-screen items-center justify-center bg-white dark:bg-black overflow-hidden"
            >
                <div
className={cn(
    "absolute inset-0",
    "[background-size:40px_40px]",
    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
    "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
    "animate-movingLight"
)}
/>


                {/* Mouse position radial gradient */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-70 duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 255, 0.15), transparent 40%)`,
                    }}
                />

                {/* Shooting Stars Effect */}
                <div className="absolute bottom-0 shooting-star-container">
                    <div className="shooting-star star-1"></div>
                    <div className="shooting-star star-2"></div>
                    <div className="shooting-star star-3"></div>
                    <div className="shooting-star star-4"></div>
                    <div className="shooting-star star-7"></div>
                    <div className="shooting-star star-8"></div>
                    <div className="shooting-star star-9"></div>
                    <div className="shooting-star star-10"></div>

                </div>

                {/* Radial gradient for the container to give a faded look */}
                <div
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
                />
                <div className="absolute -top-20 inset-0 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <p
                            className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl"
                        >
                            CodeChef BU
                        </p>
                    </div>
                    <div className="z-40 text-center">
                        <TextGenerateEffectDemo />
                    </div>
                </div>
                <div className="absolute -bottom-10 flex items-center justify-center">
                <SlidingPanel/>
            </div>
            </div>
                    
            <div>
                <VortexDemo />
            </div>
            <div className="relative z-20 min-h-screen min-w-screen">
                <ParallaxScrollDemo />
            </div>
            
        </>

    );
}
