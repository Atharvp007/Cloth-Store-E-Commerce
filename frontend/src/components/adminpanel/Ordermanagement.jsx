import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const Ordermanagement = () => {

  /* ------------ SAMPLE DATA ------------ */
  const orders = [
    { _id: 12312321, user: { name: "John Doe" }, totalPrice: 110, status: "Processing" },
    { _id: 22312321, user: { name: "Alex Smith" }, totalPrice: 210, status: "Shipped" },
    { _id: 32312321, user: { name: "Rahul Sharma" }, totalPrice: 95, status: "Delivered" },
    { _id: 42312321, user: { name: "Amit Patel" }, totalPrice: 310, status: "Processing" },
    { _id: 52312321, user: { name: "Neha Jain" }, totalPrice: 140, status: "Cancelled" },
    { _id: 62312321, user: { name: "Riya Mehta" }, totalPrice: 175, status: "Processing" },
  ];

  const handleStatusChange = (id, status) => {
    console.log(id, status);
  };

  const markDelivered = (id) => {
    console.log("Delivered:", id);
  };

  /* ------------ PAGINATION ------------ */
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Order Management
      </h2>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-sm text-gray-600">

            {/* HEADER */}
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-5 py-3 w-1/5 text-left">Order ID</th>
                <th className="px-5 py-3 w-1/5 text-left">Customer</th>
                <th className="px-5 py-3 w-1/5 text-left">Price</th>
                <th className="px-5 py-3 w-1/5 text-center">Status</th>
                <th className="px-5 py-3 w-1/5 text-center">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-5 py-4 font-medium text-gray-900">
                    #{order._id}
                  </td>

                  <td className="px-5 py-4">{order.user.name}</td>

                  <td className="px-5 py-4 font-semibold">
                    ${order.totalPrice}
                  </td>

                  {/* STATUS SELECT */}
                  <td className="px-5 py-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 px-3 py-1.5 rounded-md
                      focus:ring-2 focus:ring-indigo-400 outline-none
                      transition-all duration-200 hover:border-indigo-400"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  {/* BUTTON */}
                  <td className="px-5 py-4 text-center">
                    {order.status !== "Delivered" ? (
                      <button
                        onClick={() => markDelivered(order._id)}
                        className="
                        inline-flex items-center gap-1.5
                        bg-green-500 text-white
                        px-3 py-1.5 text-sm rounded-md
                        shadow-sm
                        hover:bg-green-600 hover:shadow-md
                        hover:scale-105
                        active:scale-95
                        transition-all duration-200
                        "
                      >
                        <CheckCircle size={15} />
                        Delivered
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold text-sm">
                        ✓ Delivered
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== PREMIUM PAGINATION ===== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t">

          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(startIndex + ordersPerPage, orders.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-indigo-600">
              {orders.length}
            </span>
          </p>

          <div className="flex items-center gap-1 bg-white shadow rounded-lg px-2 py-1">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 transition"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded-md font-medium transition
                  ${
                    currentPage === page
                      ? "bg-indigo-600 text-white shadow"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 transition"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Ordermanagement;