"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = ["/neon.jpg", "/sign.jpg", "/gift2.jpg"];

const Carousel1 = () => {
  return (
    <div className="w-full md:w-[60%] mx-auto">
      <Carousel plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent className="transition-transform duration-500 ease-in-out will-change-transform">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-none md:rounded-2xl">
                <div className="w-full h-full relative">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Carousel1;
