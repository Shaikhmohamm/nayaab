"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = ["/neon1.jpg", "/name1.jpg", "/gift1.jpg", "/nikah1.jpg"];

const Carousel1 = () => {
  return (
    <div className="w-full md:w-[60%] mx-auto mt-2">
      <h2 className="block md:hidden text-2xl font-semibold mb-2 font-serif">Our expertise</h2>
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="overflow-hidden rounded-none md:rounded-2xl"
      >
        <CarouselContent className="">
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
      </Carousel>
    </div>
  );
};

export default Carousel1;
