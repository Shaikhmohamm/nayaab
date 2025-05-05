"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const carouselImages = ["/neon1.jpg", "/name1.jpg", "/gift1.jpg", "/nikah1.jpg"];

const Carousel1 = () => {
  const [emblaApi, setEmblaApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      onSelect();
      emblaApi.on("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full md:w-[60%] mx-auto mt-2">
      <h2 className="block md:hidden text-2xl font-semibold mb-2 font-serif">Our expertise</h2>
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="overflow-hidden rounded-none md:rounded-2xl"
        setApi={setEmblaApi}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="relative h-[250px] sm:h-[300px] md:h-[400px]">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80" />

        {/* Dots Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`w-3 h-3 rounded-full ${
                selectedIndex === index ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default Carousel1;
