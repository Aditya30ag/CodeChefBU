"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    
    useEffect(() => {
        animate("span", {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
        }, {
            duration: duration ? duration : 1,
            delay: stagger(0.2),
        });
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="flex flex-wrap justify-center">
                {wordsArray.map((word, idx) => {
                    const isHeadache = word.toLowerCase().includes("headache");
                    return (
                        <motion.span
                            key={word + idx}
                            className={cn(
                                "opacity-0 text-center mx-1",
                                !isHeadache
                                    ? "dark:text-white text-black font-extrabold italic "
                                    : "dark:text-white text-black"
                            )}
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}>
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };
    

    return (
        <div className={cn("font-bold text-center w-full max-w-4xl mx-auto", className)}>
            <div className="mt-4">
                <div className="dark:text-white text-black text-base sm:text-lg md:text-xl lg:text-2xl leading-snug tracking-wide gap-2 text-center px-4 sm:px-8 md:px-12 lg:px-20">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};