import { Link } from "react-router-dom";

const AdminHome = () => {
  const orders = [
    { _id: 123123, user: { name: "John Doe" }, totalPrice: 110, status: "Processing" },
    { _id: 456456, user: { name: "Alex Smith" }, totalPrice: 240, status: "Delivered" },
  ];

  const statusStyle = (status) => {
    if (status === "Delivered") return "bg-emerald-500/20 text-emerald-400";
    if (status === "Processing") return "bg-amber-500/20 text-amber-400";
    return "bg-blue-500/20 text-blue-400";
  };

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Monitor store performance and activity</p>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {/* Revenue */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-indigo-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
          <h2 className="text-gray-400 text-sm uppercase tracking-wider">Revenue</h2>
          <p className="text-4xl font-semibold text-blue-400 mt-3">$10,000</p>
        </div>

        {/* Orders */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
          <h2 className="text-gray-400 text-sm uppercase tracking-wider">Total Orders</h2>
          <p className="text-4xl font-semibold text-white mt-3">200</p>
          <Link to="/admin/orders" className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition">
            Manage Orders →
          </Link>
        </div>

        {/* Products */}
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-600/20 to-purple-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl hover:shadow-pink-500/30 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full"></div>
          <h2 className="text-gray-400 text-sm uppercase tracking-wider">Total Products</h2>
          <p className="text-4xl font-semibold text-white mt-3">100</p>
          <Link to="/admin/products" className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition">
            Manage Products →
          </Link>
        </div>
      </div>

      {/* ===== RECENT ORDERS ===== */}
      <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-7 border-b border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-wider uppercase drop-shadow-md">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="py-4 px-6 text-left">Order ID</th>
                <th className="py-4 px-6 text-left">User</th>
                <th className="py-4 px-6 text-left">Total Price</th>
                <th className="py-4 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b cursor-pointer transition-all duration-200">
                    <td className="px-6 py-5 font-mono text-gray-500 font-medium">#{order._id}</td>
                    <td className="px-6 py-5 text-gray-500">{order.user.name}</td>
                    <td className="px-6 py-5 text-gray-500 font-medium">${order.totalPrice}</td>
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${statusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminHome;