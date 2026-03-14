
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.checkout);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/MyOrders");
    }
  }, [checkout, dispatch, navigate]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-2xl transform transition duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-700 mb-8 animate-pulse">
          🎉 Thank You for Your Order! 💌
        </h1>

        {checkout && (
          <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  🆔 Order ID: {checkout._id}
                </h2>

                <p className="text-sm text-gray-500">
                  📅 Placed on: {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-left sm:text-right mt-4 sm:mt-0">
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-semibold text-gray-800">
                  📦 {formattedDelivery}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {checkout.checkoutItems.map((item, idx) => (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-white"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-2xl shadow-sm"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>

                    {item.size && (
                      <p className="text-gray-500 text-sm">
                        Size: {item.size}
                      </p>
                    )}

                    {item.color && (
                      <p className="text-gray-500 text-sm">
                        Color: {item.color}
                      </p>
                    )}
                  </div>

                  <p className="font-bold text-gray-900 text-lg">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🏠 Shipping Address
              </h3>

              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>

              <p className="text-gray-600">
                {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
              >
                🏡 Back to Home
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirm;

