import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-400 tracking-widest uppercase text-sm">
          No Products Available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          {/* Product Image */}
          <div className="h-[320px] w-full overflow-hidden bg-gray-100">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 tracking-wide">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">${product.price}</p>

            <button className="mt-4 w-full border border-black text-black py-2 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black hover:text-white">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
