import { useState } from 'react';
import { Code } from 'lucide-react';
import { motion } from 'framer-motion';
import Marquee from './Marquee';

export default function SlidingPanel() {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [codeContent, setCodeContent] = useState(`// Start coding here
function helloWorld() {
  console.log("Hello, world!");
}

// This is a mock code editor
// You can implement an actual editor
// using libraries like Monaco Editor
// or CodeMirror in a real application

helloWorld();`);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className="relative h-full w-screen bg-black overflow-hidden">
            {/* Main content area */}
            <div className="p-6">

            <Marquee />

               
            </div>

            </div>
    );
}