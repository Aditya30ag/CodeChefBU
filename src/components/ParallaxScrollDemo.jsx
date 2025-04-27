"use client";

import { LayoutGridDemo } from "./LayoutGridDemo";



export function ParallaxScrollDemo() {
  return (
    <section className="py-4 bg-transparent text-white">
      <div className="container mx-auto px-4 mb-2">
        <div className="text-start mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            MEET OUR TEAM
          </h2>
          <p className="text-xl text-start text-gray-300 max-w-2xl">
            Meet the team that debugs life one line at a time!
          </p>
        </div>
      </div>
      
      
      <LayoutGridDemo />
      
    </section>
  );
}