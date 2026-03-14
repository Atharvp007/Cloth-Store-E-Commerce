import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminorderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  // Fetch orders on mount
  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
    else dispatch(fetchAllOrders());
  }, [dispatch, user, navigate]);

  // Update order status
  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-sm text-gray-600">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-5 py-3 w-1/5 text-left">Order ID</th>
                <th className="px-5 py-3 w-1/5 text-left">Customer</th>
                <th className="px-5 py-3 w-1/5 text-left">Price</th>
                <th className="px-5 py-3 w-1/5 text-center">Status</th>
                <th className="px-5 py-3 w-1/5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => {
                const isDelivered = order.status === "Delivered";
                return (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition-all duration-300">
                    <td className="px-5 py-4 font-medium text-gray-900">#{order._id}</td>
                    <td className="px-5 py-4">{order.user.name}</td>
                    <td className="px-5 py-4 font-semibold">${order.totalPrice}</td>

                    {/* STATUS */}
                    <td className="px-5 py-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border border-gray-300 px-3 py-1.5 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none transition-all duration-200 hover:border-indigo-400"
                      >
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    {/* BUTTON WITH SMOOTH TRANSITION */}
                    <td className="px-5 py-4 text-center relative h-10">
                      <div className="relative h-8 w-full flex justify-center items-center">
                        <button
                          onClick={() => handleStatusChange(order._id, "Delivered")}
                          className={`absolute transition-all duration-500 ease-in-out ${
                            isDelivered ? "opacity-0 translate-y-[-20px] pointer-events-none" : "opacity-100 translate-y-0"
                          } inline-flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 text-sm rounded-md shadow-sm hover:bg-green-600 hover:shadow-md`}
                        >
                          <CheckCircle size={15} />
                          Delivered
                        </button>

                        <span
                          className={`absolute transition-all duration-500 ease-in-out ${
                            isDelivered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"
                          } text-green-600 font-semibold text-sm`}
                        >
                          ✓ Delivered
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(startIndex + ordersPerPage, orders.length)}</span> of{" "}
            <span className="font-semibold text-indigo-600">{orders.length}</span>
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
                  className={`w-8 h-8 text-sm rounded-md font-medium transition ${
                    currentPage === page ? "bg-indigo-600 text-white shadow" : "hover:bg-gray-100"
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

export default OrderManagement;