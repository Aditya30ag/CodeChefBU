import { useState, useEffect, useRef } from 'react';

export default function WhiteDottedBackground() {
    const containerRef = useRef(null);
    const [dots, setDots] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;

                const dotCount = Math.floor((clientWidth * clientHeight) / 4000); // More dense
                const newDots = [];

                for (let i = 0; i < dotCount; i++) {
                    newDots.push({
                        id: i,
                        x: Math.random() * clientWidth,
                        y: Math.random() * clientHeight,
                        size: Math.random() * 2 + 1,
                        opacity: Math.random() * 0.7 + 0.3,
                        color: getRandomStarColor(),
                        flickerSpeed: Math.random() * 2 + 1, // Flicker speed
                        originalX: Math.random() * clientWidth,
                        originalY: Math.random() * clientHeight,
                        vx: 0,
                        vy: 0,
                    });
                }
                setDots(newDots);
            }
        };

        const getRandomStarColor = () => {
            const colors = ['#ffffff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#9bf6ff', '#caffbf'];
            return colors[Math.floor(Math.random() * colors.length)];
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

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

    useEffect(() => {
        if (dots.length === 0) return;

        const updateDots = () => {
            setDots(currentDots =>
                currentDots.map(dot => {
                    const dx = mousePosition.x - dot.x;
                    const dy = mousePosition.y - dot.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const radius = 120;

                    let vx = dot.vx;
                    let vy = dot.vy;

                    if (distance < radius) {
                        const force = (radius - distance) / radius;
                        const angle = Math.atan2(dy, dx);
                        vx += Math.cos(angle) * force * -2;
                        vy += Math.sin(angle) * force * -2;
                    } else {
                        vx += (dot.originalX - dot.x) * 0.005;
                        vy += (dot.originalY - dot.y) * 0.005;
                    }

                    vx *= 0.92;
                    vy *= 0.92;

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
                    className="absolute rounded-full"
                    style={{
                        left: `${dot.x}px`,
                        top: `${dot.y}px`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        background: dot.color,
                        opacity: dot.opacity,
                        transform: `translate(-50%, -50%)`,
                        animation: `flicker ${dot.flickerSpeed}s infinite alternate ease-in-out`,
                        willChange: 'opacity',
                    }}
                />
            ))}

            {/* Flicker Keyframes */}
            <style jsx>{`
                @keyframes flicker {
                    0% {
                        opacity: 0.3;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    100% {
                        opacity: 0.3;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
