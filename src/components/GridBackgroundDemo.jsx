import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { TextGenerateEffectDemo } from "./TextGenerateEffectDemo";
import { ParallaxScrollDemo } from "./ParallaxScrollDemo";
import { VortexDemo } from "./VortexDemo";
import SlidingPanel, { GetSetComponent } from "./GetSetComponent";
import PastEvents from "./PastEvents";
import DotText from "./HoverTextBlur";
import Footer from "./Footer";
import { HeroImage, HeroImage1 } from "./HeroImage";

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
        transform: translate(0, 0) rotate(-45deg); /* Correct angle */
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    100% {
        transform: translate(-150vw, 150vh) rotate(-45deg); /* Move further across */
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
    width: 3px; 
    height: 3px;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    z-index: 50;
    box-shadow:
        0 0 10px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(150, 240, 255, 0.6),
        0 0 30px rgba(150, 240, 255, 0.4);
}

.shooting-star::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 120px;  /* Longer and smoother trail */
    height: 2px;
    background: linear-gradient(270deg, 
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.2),
        transparent);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.star-1, .star-2, .star-3, .star-4, .star-5 {
    right: -50px; /* start slightly off-screen */
    animation: shootingStar linear infinite;
}

.star-1 {
    top: 5%;
    animation-duration: 6s;
    animation-delay: 0s;
}
.star-2 {
    top: 15%;
    animation-duration: 7s;
    animation-delay: 2s;
}
.star-3 {
    top: 25%;
    animation-duration: 8s;
    animation-delay: 4s;
}
.star-4 {
    top: 35%;
    animation-duration: 9s;
    animation-delay: 6s;
}
.star-5 {
    top: 45%;
    animation-duration: 7s;
    animation-delay: 3s;
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
                className="relative -top-40 flex h-screen min-w-screen items-center justify-center bg-white dark:bg-black overflow-hidden"
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
                <div className="absolute shooting-star-container">
                    <div className="shooting-star star-1"></div>
                    <div className="shooting-star star-2"></div>
                    <div className="shooting-star star-3"></div>
                    <div className="shooting-star star-4"></div>
                    <div className="shooting-star star-5"></div>
                </div>

                {/* Radial gradient for the container to give a faded look */}
                <div
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
                />
                <div className="absolute -top-20 inset-0 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <p
                            className="relative z-20 py-8 text-4xl font-bold sm:text-7xl"
                            style={{
                                color: "#ffffff",
                                textShadow: `
                                    0 1px 0 #cccccc,
                                    0 2px 0 #c9c9c9,
                                    0 3px 0 #bbb,
                                    0 4px 0 #b9b9b9,
                                    0 5px 0 #aaa,
                                    0 6px 1px rgba(0,0,0,.1),
                                    0 0 5px rgba(0,0,0,.1),
                                    0 1px 3px rgba(0,0,0,.3),
                                    0 3px 5px rgba(0,0,0,.2),
                                    0 5px 10px rgba(0,0,0,.25),
                                    0 10px 10px rgba(0,0,0,.2),
                                    0 20px 20px rgba(0,0,0,.15)
                                    `,
                                transform: "perspective(500px) rotateX(5deg)",
                                transformStyle: "preserve-3d",
                                animation: "float3d 4s ease-in-out infinite"
                            }}
                        >
                            CodeChef BU
                        </p>
                        <div>
                            <HeroImage1 />
                        </div>
                        <div>
                            <HeroImage />
                        </div>
                    </div>
                    <div className="z-40 text-center">
                        <TextGenerateEffectDemo />
                    </div>

                    <style jsx>{`
                    @keyframes float3d {
                    0% { transform: perspective(500px) rotateX(5deg) translateY(0); }
                    50% { transform: perspective(500px) rotateX(10deg) translateY(-20px); }
                    100% { transform: perspective(500px) rotateX(5deg) translateY(0); }
                    }
                `}</style>
                </div>
                <div className="absolute -bottom-10 flex items-center justify-center">
                    <SlidingPanel />
                </div>
            </div>

            <div id="about">
                <VortexDemo />
            </div>
            <div className="relative z-20 min-h-screen min-w-screen flex justify-center items-center" id="team">
                <ParallaxScrollDemo />
            </div>
            <div className="relative min-w-screen  mt-10 mb-20 z-20 " id="events">
                <PastEvents />
            </div>
            <div className="relative min-w-screen z-20 " id="getset">
                <DotText />
            </div>
            <div>
                <Footer />
            </div>
            <div className="absolute inset-0 border-4 border-white rounded-lg animate-snake-border  "></div>

        </>

    );
}
