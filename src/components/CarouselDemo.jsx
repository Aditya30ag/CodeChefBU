"use client";

import { Carousel } from "@/ui/carousel";
export function CarouselDemo() {
    const slideData = [
        {
            title: "Mystic Mountains",
            button: "Explore Component",
            src: "/IMG-20241007-WA0029.jpg",
        },
        {
            title: "Urban Dreams",
            button: "Explore Component",
            src: "/IMG-20241007-WA0019.jpg",
        },
        {
            title: "Neon Nights",
            button: "Explore Component",
            src: "/Adifoto2_20250502_183646_0000.png",
        },
        {
            title: "Desert Whispers",
            button: "Explore Component",
            src: "/Untitled design (1).png",
        },
    ];
    return (
        <div className="relative overflow-hidden w-full h-full py-20">
            <Carousel slides={slideData} />
        </div>
    );
}
