import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MarqueeWithReflection() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Set initial width and update on resize
    setWidth(window.innerWidth);
    
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate how many repetitions needed to fill screen plus overflow
  const text = "GET SET CODE";
  const textWithSpace = text + " • ";
  // Estimate chars that fit in screen width (approximate)
  const repetitions = Math.ceil((width / 14) / textWithSpace.length) * 2;
  
  // Create array of repeated text
  const repeatedText = Array(repetitions).fill(textWithSpace);
  
  return (
    <div className="w-full flex flex-col bg-black py-4 z-100 pointer-events-none">
      {/* Original direction - right to left */}
      <div className="w-full overflow-hidden py-2">
        <motion.div 
          className="whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity,
            repeatType: "loop",
            duration: 15, 
            ease: "linear"
          }}
        >
          <div className="inline-block">
            {repeatedText.map((item, index) => (
              <span key={index} className="text-4xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent inline-flex items-center">
                {text} <span className="mx-2 text-neutral-400">•</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-1"></div>
      
      {/* Mirror reflection - left to right */}
      <div className="w-full overflow-hidden py-2">
        <motion.div 
          className="whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ 
            repeat: Infinity,
            repeatType: "loop",
            duration: 15, 
            ease: "linear"
          }}
        >
          <div className="inline-block opacity-70"> {/* Slightly transparent for reflection effect */}
            {repeatedText.map((item, index) => (
              <span key={index} className="text-4xl font-bold bg-gradient-to-b from-neutral-400 to-neutral-700 bg-clip-text text-transparent inline-flex items-center">
                {text} <span className="mx-2 text-neutral-500">•</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}