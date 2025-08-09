"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 4;

const Bestseller = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

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

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  const visibleProducts = bestsellers.slice(0, visibleCount);

  return (
    <section className="md:py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold my-2 md:mb-8 md:ml-2">Trending</h2>

      <div className="flex flex-row gap-6 overflow-x-auto md:grid md:grid-cols-3 xl:grid-cols-4 items-center">
        {visibleProducts.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id} className="min-w-[200px]">
            <Card
              className="rounded-2xl min-w-[200px] hover:border-white hover:shadow-xl transition duration-300"
            >
              <CardHeader className="p-1">
                <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mx-auto">
                  <Image
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.name}
                    layout="fill"
                    className="object-contain transition-transform duration-300 ease-in-out transform hover:scale-105 brightness-95 hover:brightness-110"
                  />
                </div>
                <CardTitle className="text-red-900 text-lg font-bold text-center">
                  {product.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-4 pb-3 text-center">
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-center items-center text-sm font-medium">
                  <span className="text-green-900 font-bold text-center">
                    ₹{product.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {visibleCount < bestsellers.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-black hover:text-white transition"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default Bestseller;
