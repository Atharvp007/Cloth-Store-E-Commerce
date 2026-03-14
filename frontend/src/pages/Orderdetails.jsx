
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const Orderdetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/myorders");
    }, 300);
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No Order details found</p>
      </div>
    );
  }

  const subtotal = orderDetails.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div
      className={`bg-gray-50 min-h-screen py-10 transition-all duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Order Details
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

                <div>
                  <h3 className="text-xl font-semibold">
                    Order #{orderDetails._id}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {new Date(orderDetails.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">

                  <span
                    className={`px-5 py-1.5 rounded-full text-sm font-semibold ${
                      orderDetails.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {orderDetails.isPaid
                      ? "✓ Payment Approved"
                      : "● Payment Pending"}
                  </span>

                  <span
                    className={`px-5 py-1.5 rounded-full text-sm font-semibold ${
                      orderDetails.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {orderDetails.isDelivered
                      ? "✓ Delivered"
                      : "🚚 Delivery Pending"}
                  </span>

                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl shadow-sm border p-6">
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

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h4 className="font-semibold text-lg mb-3">
                  Shipping Information
                </h4>

                <p className="text-gray-600">
                  {orderDetails.shippingAddress?.city},{" "}
                  {orderDetails.shippingAddress?.country}
                </p>
              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h4 className="font-semibold text-lg mb-6">
                Ordered Products
              </h4>

              <div className="space-y-5">
                {orderDetails.orderItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between border-b pb-4"
                  >

                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-medium text-gray-700 hover:text-black"
                        >
                          {item.name}
                        </Link>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
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

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit">
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

            <button
              onClick={handleBack}
              className="block mt-6 text-center bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 w-full"
            >
              Back to Orders
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Orderdetails;

