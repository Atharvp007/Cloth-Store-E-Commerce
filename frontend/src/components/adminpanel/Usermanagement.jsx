import { useState } from "react";

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  // Dummy users
  const users = [
    { _id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { _id: 2, name: "Jane Smith", email: "jane@example.com", role: "customer" },
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New User:", formData);
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };
  const handleDelete = (user) => console.log("Delete clicked for:", user);
  const handleRoleChange = (id, newRole) => console.log(`Role changed for ${id} to ${newRole}`);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">User Management</h2>

      {/* Add New User Form */}
      <div className="p-6 rounded-2xl bg-white shadow-xl mb-10 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-5">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto shadow-xl sm:rounded-2xl border border-gray-200 bg-white">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 tracking-wider">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition cursor-default"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none hover:shadow-sm transition-all duration-300"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td
                  className="p-4 text-red-600 font-semibold cursor-pointer hover:text-red-500 transition-all duration-300"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;