import { useState, useEffect, useRef } from 'react';

export default function WhiteDottedBackground() {
    const containerRef = useRef(null);
    const [dots, setDots] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Generate initial dots
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });

                const dotCount = Math.floor((clientWidth * clientHeight) / 5000);
                const newDots = [];

                for (let i = 0; i < dotCount; i++) {
                    newDots.push({
                        id: i,
                        x: Math.random() * clientWidth,
                        y: Math.random() * clientHeight,
                        size: Math.random() * 3 + 2,
                        opacity: Math.random() * 0.3 + 0.1,
                        originalX: Math.random() * clientWidth,
                        originalY: Math.random() * clientHeight,
                        vx: 0,
                        vy: 0,
                    });
                }
                setDots(newDots);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Handle mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Smooth update of dots
    useEffect(() => {
        if (dots.length === 0) return;

        const updateDots = () => {
            setDots(currentDots =>
                currentDots.map(dot => {
                    const dx = mousePosition.x - dot.x;
                    const dy = mousePosition.y - dot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const radius = 150;

                    let vx = dot.vx;
                    let vy = dot.vy;

                    if (distance < radius) {
                        const force = (radius - distance) / radius;
                        const angle = Math.atan2(dy, dx);
                        vx += Math.cos(angle) * force * -2.5; // Slightly gentler push
                        vy += Math.sin(angle) * force * -2.5;
                    } else {
                        // Gentle pullback to original position
                        vx += (dot.originalX - dot.x) * 0.01;
                        vy += (dot.originalY - dot.y) * 0.01;
                    }

                    // Apply velocity damping for smoother motion
                    vx *= 0.90;
                    vy *= 0.90;

                    return {
                        ...dot,
                        x: dot.x + vx,
                        y: dot.y + vy,
                        vx,
                        vy,
                    };
                })
            );

            requestAnimationFrame(updateDots);
        };

        const animationId = requestAnimationFrame(updateDots);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [dots, mousePosition]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        >
            {dots.map(dot => (
                <div
                    key={dot.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${dot.x}px`,
                        top: `${dot.y}px`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        opacity: dot.opacity,
                        transition: 'transform 0.3s ease, opacity 0.3s ease', // Smooth transitions
                        transform: `translate(-50%, -50%)`, // Center dots more nicely
                    }}
                />
            ))}

            {/* Optional content overlay */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center p-8">
                    {/* Place your content here */}
                </div>
            </div>
        </div>
    );
}
