import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Orderdetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const defaultOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: { city: "New York", country: "USA" },
      orderItems: [
        {
          productId: "1",
          name: "Leather Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "Winter Jacket",
          price: 120,
          quantity: 2,
          image: "https://picsum.photos/150?random=2",
        },
      ],
    };

    setOrderDetails(defaultOrderDetails);
  }, [id]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No Order details found</p>
      </div>
    );
  }

  // ===== Price Calculations =====
  const subtotal = orderDetails.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* PAGE TITLE */}
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Order Details
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* ORDER HEADER */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div>
                  <h3 className="text-xl font-semibold">
                    Order #{orderDetails._id}
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {new Date(
                      orderDetails.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* ===== PREMIUM STATUS BADGES ===== */}
                <div className="flex gap-3">

                  {/* PAYMENT STATUS */}
                  <span
                    className={`px-5 py-1.5 rounded-full text-sm font-semibold
                    transition-all duration-300 ease-in-out
                    shadow-sm hover:shadow-md hover:-translate-y-0.5
                    ${
                      orderDetails.isPaid
                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                        : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    }`}
                  >
                    {orderDetails.isPaid
                      ? "✓ Payment Approved"
                      : "● Payment Pending"}
                  </span>

                  {/* DELIVERY STATUS */}
                  <span
                    className={`px-5 py-1.5 rounded-full text-sm font-semibold
                    transition-all duration-300 ease-in-out
                    shadow-sm hover:shadow-md hover:-translate-y-0.5
                    ${
                      orderDetails.isDelivered
                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
                    }`}
                  >
                    {orderDetails.isDelivered
                      ? "✓ Delivered"
                      : "🚚 Delivery Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT + SHIPPING */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6 transition hover:shadow-md">
                <h4 className="font-semibold text-lg mb-3">
                  Payment Information
                </h4>
                <p className="text-gray-600">
                  Method: {orderDetails.paymentMethod}
                </p>
                <p className="text-gray-600">
                  Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6 transition hover:shadow-md">
                <h4 className="font-semibold text-lg mb-3">
                  Shipping Information
                </h4>
                <p className="text-gray-600">
                  Method: {orderDetails.shippingMethod}
                </p>
                <p className="text-gray-600">
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h4 className="font-semibold text-lg mb-6">
                Ordered Products
              </h4>

              <div className="space-y-5">
                {orderDetails.orderItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between border-b pb-4 transition hover:bg-gray-50 rounded-lg p-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                      />

                      <div>
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-medium text-gray-700 hover:text-black transition"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ${item.price * item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit transition hover:shadow-lg">
            <h4 className="font-semibold text-lg mb-6">
              Order Summary
            </h4>

            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
            </div>

            <div className="border-t mt-5 pt-5 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>

            
            <Link
              to="/myorders"
              className="
              relative block mt-6 text-center
              bg-black text-white
              py-3 rounded-xl font-medium
              transition-all duration-300
              hover:bg-gray-900
              hover:shadow-xl
              hover:-translate-y-1
              active:translate-y-0 active:shadow-md
              "
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;