"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const Bestseller = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
        const featured = response.data.filter((product) => product.isFeatured);
        setBestsellers(featured);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="md:py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold mb-2 md:mb-8 md:ml-2">Bestsellers</h2>

      <div className="flex flex-row gap-6 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-4 items-center">
        {bestsellers.map((product) => (
          <Card
            key={product._id}
            className="rounded-2xl min-w-[240px] hover:border-white hover:shadow-xl transition duration-300"
          >
            <CardHeader className="p-1">
              <div className="relative w-full h-64 rounded-lg overflow-hidden mx-auto">
                <Image
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.name}
                  layout="fill"
                  className="object-contain transition-transform duration-300 ease-in-out transform hover:scale-105 brightness-95 hover:brightness-110"
                />
              </div>
              <CardTitle className="mt-2 text-lg font-semibold text-center">
                {product.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-3 text-center">
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-center items-center text-sm font-medium text-gray-200">
                <span className="text-green-400 font-bold text-center">
                  ₹{product.price}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </section>
  );
};

export default Bestseller;
