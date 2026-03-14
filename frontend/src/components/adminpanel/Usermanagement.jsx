import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addUser,
  updateUser,
  deleteUser,
  fetchUsers,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [updatingUserIds, setUpdatingUserIds] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users = [], loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
    dispatch(fetchUsers());
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingUserIds((prev) => [...prev, userId]);
      await dispatch(updateUser({ id: userId, role: newRole }));
    } finally {
      setUpdatingUserIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">User Management</h2>

      {/* ADD USER FORM */}
      <div className="p-6 rounded-2xl bg-white shadow-xl mb-10 border border-gray-200">
        <h3 className="text-xl font-semibold mb-5">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </form>
      </div>

      {/* USERS TABLE */}
      <div className="overflow-x-auto shadow-xl rounded-2xl border bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 flex items-center">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="p-2 border rounded"
                      disabled={updatingUserIds.includes(u._id)}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                    {updatingUserIds.includes(u._id) && (
                      <span className="ml-2 text-gray-400 animate-pulse text-sm">
                        Updating...
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className="text-red-600 font-semibold cursor-pointer relative 
                        after:block after:absolute after:bottom-0 after:left-0 after:w-0 
                        after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 
                        hover:after:w-full"
                      onClick={() => handleDeleteUser(u._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No users found
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