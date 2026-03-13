import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          {/* Left Section */}
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />

            <div>
              <h3>{product.name}</h3>

              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>

              <div className="flex items-center mt-2">

                {/* Minus Button */}
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-lg font-semibold shadow-sm hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  −
                </button>

                {/* Quantity */}
                <span className="mx-4 min-w-[20px] text-center font-medium transition-all duration-200">
                  {product.quantity}
                </span>

                {/* Plus Button */}
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-lg font-semibold shadow-sm hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  +
                </button>

              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="text-right">
            <p className="font-medium">
              ${product.price.toLocaleString()}
            </p>

            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600 hover:scale-110 transition cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;