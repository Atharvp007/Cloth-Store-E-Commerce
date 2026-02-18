import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            { name: "Product 1", image: "https://picsum.photos/500/500?random=1" },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "12344",
          createdAt: new Date(),
          shippingAddress: { city: "Los Angeles", country: "USA" },
          orderItems: [
            { name: "Product 2", image: "https://picsum.photos/500/500?random=2" },
          ],
          totalPrice: 150,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 uppercase text-sm tracking-wide">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white backdrop-blur-sm bg-white/70">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition-all duration-300">
                  <td className="py-3 px-4">
                    <img 
                      src={order.orderItems[0]?.image} 
                      alt={order.orderItems[0]?.name} 
                      className="w-12 h-12 object-cover rounded-xl shadow-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">#{order._id}</td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{`${order.shippingAddress.city}, ${order.shippingAddress.country}`}</td>
                  <td className="py-3 px-4">{order.orderItems.length}</td>
                  <td className="py-3 px-4 font-semibold">${order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.isPaid ? "bg-green-100 text-green-800 shadow-inner" : "bg-red-100 text-red-800 shadow-inner"
                    }`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500 font-medium">
                  Loading orders...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      <div className="mt-6 h-2 bg-gradient-to-r from-black/10 via-white/0 to-black/10 rounded-full"></div>
    </div>
  );
};

export default MyOrders;
