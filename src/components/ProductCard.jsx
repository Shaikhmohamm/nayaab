import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white w-[280px] sm:w-[260px] md:w-[240px] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 ease-in-out group mx-2 my-4">
      {/* Product Image */}
      <div className="relative w-full h-64 bg-white overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-contain w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.title}</h3>

        <p className="text-sm font-bold text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-700 font-bold text-sm">₹{product.price}</span>

          <button className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-700 text-white text-xs px-2.5 py-1.5 rounded-lg transition">
            <FiShoppingCart className="text-sm" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
