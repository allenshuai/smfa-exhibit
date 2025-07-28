// components/ImageSlider.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full h-48 border rounded overflow-hidden bg-white">
      <Image
        src={images[index]}
        alt={`Slide ${index + 1}`}
        fill
        className="object-cover"
      />
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#fef6e4]/80 px-2 py-1 rounded text-sm">
        ‹
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fef6e4]/80 px-2 py-1 rounded text-sm">
        ›
      </button>
    </div>
  );
}
