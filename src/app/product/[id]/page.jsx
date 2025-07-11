"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Carousell from "@/components/Carousell";

const ProductDetailPage = ({ params }) => {
  const { id } = use(params);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Layout grid: image + details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Carousel or Images */}
        <div className="w-full">
          <Carousell images={product.images} />
        </div>

        {/* Product info */}
        <div className="flex flex-col justify-between">
          {/* Title & Description */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {product.description}
            </p>

            <p className="text-2xl text-green-700 font-bold mb-4">₹{product.price}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition">
                Add to Cart
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition">
                Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
