import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/shopping-bag.png";
import CartDrawer from "../layout/CartDrawer.jsx";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      console.log(searchTerm);
      setSearchTerm("");
    }
  };

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">

          {/* ===== Logo ===== */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="logo" className="w-7 h-7 md:w-10 md:h-10" />

            <span
              className="
              text-2xl md:text-3xl font-extrabold tracking-wide
              bg-gradient-to-r from-black via-gray-700 to-gray-400
              bg-clip-text text-transparent
              group-hover:scale-105 group-hover:tracking-wider
              transition-all duration-300
              "
            >
              clothify
            </span>
          </Link>

          {/* ===== Search ===== */}
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 bg-gray-100 w-72 pr-12 focus:ring-2 focus:ring-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Button
              className="absolute right-0 top-0 h-full px-4 bg-black hover:bg-gray-800"
              onClick={handleSearch}
            >
              <FaSearch />
            </Button>
          </div>

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden md:flex space-x-8">
            {["Men", "Women", "Uppercloths", "Lowercloths"].map((item) => (
              <Link
                key={item}
                to="/collections/all"
                className="
                text-gray-700 text-sm font-medium uppercase tracking-wide
                relative group
                "
              >
                {item}

                {/* Premium underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* ===== Right Icons ===== */}
          <div className="flex items-center space-x-5">

            {/* Premium Admin Button */}
            <Link
              to="/admin"
              className="
              hidden md:flex items-center
              px-4 py-1.5
              rounded-full
              text-xs font-semibold uppercase tracking-wide
              bg-gradient-to-r from-black to-gray-800
              text-white
              shadow-md
              hover:shadow-xl hover:scale-105
              active:scale-95
              transition-all duration-300
              "
            >
              Admin Panel
            </Link>

            {/* Profile */}
            <Link to="/profile" className="hover:scale-110 transition">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCartDrawer}
              className="relative hover:scale-110 transition"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 cursor-pointer" />

              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                3
              </span>
            </button>

            {/* Mobile Menu */}
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== CART DRAWER ===== */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full
        bg-white shadow-2xl transform transition-transform duration-300 z-50
        ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Menu</h2>

          <nav className="space-y-5">
            {["Men", "Women", "Top Wear", "Bottom Wear"].map((item) => (
              <Link
                key={item}
                to="/collections/all"
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black transition"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;