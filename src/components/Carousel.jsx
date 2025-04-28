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
      <h2 className="text-3xl font-bold mb-2 ">Our expertise</h2>
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="overflow-hidden rounded-none md:rounded-2xl"
      >
        <CarouselContent className="">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="relative h-[220px] sm:h-[300px] md:h-[400px]">
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
      </Carousel>
    </div>
  );
};

export default Carousel1;
