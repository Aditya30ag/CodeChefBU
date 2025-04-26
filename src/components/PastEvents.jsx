import React from 'react'
import { CarouselDemo } from './CarouselDemo'

export default function PastEvents() {
  return (
    <div className="container mx-auto px-4 mb-2">
        <div className="text-end mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Events
          </h2>
          <p className="text-xl text-end text-gray-300">
            Here are some of our past events that showcase our team's journey!
          </p>
        </div>
        <CarouselDemo/>
    </div>
  )
}
