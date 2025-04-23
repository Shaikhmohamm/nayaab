"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroHeader = () => {
    return (
        <div className="relative w-full h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Content */}
            <div className="relative z-10 max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                    Custom Nameplates & Signage that Stand Out!
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">
                    Elevate your space with high-quality nameplates, neon signage, and more.
                </p>
                
                {/* CTA Buttons */}
                <div className="mt-6 flex gap-4 justify-center">
                    <Button className="bg-[#ffcc00] text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-[#e6b800] transition-all duration-300">
                        Get a Quote
                    </Button>
                    <Button className="border border-white text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-black transition-all duration-300">
                        View Gallery
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;
