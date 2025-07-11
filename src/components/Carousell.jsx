'use client';

import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const Carousell = ({ images = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);

  return (
    <div className="relative w-full">
      {/* Embla viewport */}
      <div className="overflow-hidden bg-white" ref={emblaRef}>
        <div className="flex">
          {images.map((img, idx) => (
            <div key={idx} className="min-w-0 flex-[0_0_100%] relative h-80 sm:h-[26rem]">
              <Image
                src={img || '/placeholder.jpg'}
                alt={`Product image ${idx + 1}`}
                fill
                className="object-cover border rounded-2xl transition duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={scrollPrev}
        aria-label="Previous image"
        className="absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md rounded-full p-2 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        aria-label="Next image"
        className="absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md rounded-full p-2 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousell;
