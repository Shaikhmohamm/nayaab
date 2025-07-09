import axios from "axios";
import Image from "next/image";

// Dynamic route page
const ProductDetailPage = async ({ params }) => {
  const { id } = params;
  let product;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`);
    product = response.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return <div className="p-6">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="relative w-full h-80 mb-4">
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-contain rounded-lg"
        />
      </div>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl text-green-700 font-semibold">₹{product.price}</p>
    </div>
  );
};

export default ProductDetailPage;
