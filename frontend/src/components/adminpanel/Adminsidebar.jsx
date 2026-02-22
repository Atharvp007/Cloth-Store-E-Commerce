import { Link, NavLink } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaShoppingCart,
  FaStore,
  FaSignOutAlt,
  FaAngleLeft,
} from "react-icons/fa";

const Adminsidebar = ({ collapsed, setCollapsed }) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menu = [
    { to: "/admin/users", icon: <FaUser />, label: "Users" },
    { to: "/admin/products", icon: <FaBox />, label: "Products" },
    { to: "/admin/orders", icon: <FaShoppingCart />, label: "Orders" },
    { to: "/admin/shop", icon: <FaStore />, label: "Shop" },
  ];

  /* ===== NAV STYLE ===== */
  const navStyle = ({ isActive }) =>
    `
    group relative flex items-center
    ${collapsed ? "justify-center" : "gap-4"}
    px-4 py-3 rounded-xl
    transition-all duration-300 ease-out
    ${
      isActive
        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }
  `;

  return (
    <div
      className="
      h-screen flex flex-col p-4
      bg-gradient-to-b
      from-[#0a192f]
      via-[#112240]
      to-[#020c1b]
      border-r border-white/10
      backdrop-blur-xl
    "
    >
      {/* ===== LOGO + COLLAPSE BUTTON ===== */}
      <div className="flex items-center justify-between mb-10">

        {!collapsed && (
          <Link
            to="/admin"
            className="
            text-2xl font-bold tracking-wide
            bg-gradient-to-r from-cyan-400 to-blue-400
            bg-clip-text text-transparent
          "
          >
            Rabbit
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <FaAngleLeft
            className={`text-gray-300 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* ===== MENU ===== */}
      <nav className="flex flex-col gap-2 flex-grow">
        {menu.map((item, i) => (
          <NavLink key={i} to={item.to} className={navStyle}>

            {/* ICON */}
            <span className="text-lg group-hover:scale-110 transition">
              {item.icon}
            </span>

            {/* LABEL */}
            {!collapsed && (
              <span className="font-medium tracking-wide">
                {item.label}
              </span>
            )}

            {/* TOOLTIP WHEN COLLAPSED */}
            {collapsed && (
              <span
                className="
                absolute left-16
                bg-gray-900 text-white text-sm
                px-3 py-1 rounded-md
                opacity-0 group-hover:opacity-100
                transition pointer-events-none
                whitespace-nowrap
              "
              >
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ===== LOGOUT BUTTON ===== */}
      <button
        onClick={handleLogout}
        className="
        flex items-center justify-center gap-3
        py-3 mt-6 rounded-xl
        bg-gradient-to-r from-rose-500 to-red-600
        hover:scale-105 active:scale-95
        transition-all duration-300
        shadow-lg hover:shadow-red-500/40
      "
      >
        <FaSignOutAlt />
        {!collapsed && "Logout"}
      </button>
    </div>
  );
};

export default Adminsidebar;