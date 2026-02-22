import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Adminsidebar from "./Adminsidebar.jsx";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-[#f8fafc]">

      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
          bg-purple-300 opacity-20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px]
          bg-indigo-300 opacity-20 blur-[120px] rounded-full" />
      </div>

      {/* ===== MOBILE TOPBAR ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50
        flex items-center p-4
        bg-white/70 backdrop-blur-xl
        border-b shadow-sm">

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FaBars size={22} />
        </button>

        <h1 className="ml-4 text-lg font-semibold">
          Admin Dashboard
        </h1>
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ===== SIDEBAR (FULL HEIGHT) ===== */}
      <div
        className={`
          fixed md:static z-50
          h-screen
          ${collapsed ? "w-20" : "w-72"}
          transform transition-all duration-300 ease-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          bg-gray-950 text-white
          border-r border-gray-800
          shadow-[6px_0_40px_rgba(0,0,0,0.35)]
        `}
      >
        <Adminsidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col w-full">

        {/* Desktop Floating Header */}
        <div className="hidden md:flex sticky top-6 z-30 px-10">
          <div className="
            w-full flex items-center justify-between
            px-8 py-5 rounded-2xl
            bg-white/60 backdrop-blur-xl
            border shadow-sm">

            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Control your platform with confidence
              </p>
            </div>

            <div className="w-11 h-11 rounded-full
              bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg" />
          </div>
        </div>

        {/* PAGE AREA */}
        <main className="flex-1 p-6 md:p-10 mt-16 md:mt-6 overflow-y-auto">
          <div className="
            relative bg-white/80 backdrop-blur-lg
            rounded-3xl border
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            p-8 min-h-[82vh]
          ">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Admin;