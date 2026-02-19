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

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left — Logo */}
        <div>
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="logo" className="w-7 h-7 md:w-10 md:h-10" />

            {/* Styled Brand Name */}
            <span
              className="text-2xl md:text-3xl font-extrabold tracking-wide
            bg-gradient-to-r from-black via-gray-700 to-gray-400
            bg-clip-text text-transparent
            group-hover:scale-105 group-hover:tracking-wider
            transition-all duration-300"
            >
              clothify
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Input
            type="text"
            placeholder="Search..."
            className="border border-gray-700 dark:border-gray-900 bg-gray-300 dark:bg-gray-900 w-75"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            className="absolute right-0 top-0 h-full px-4"
            onClick={handleSearch}
          >
            <FaSearch />
          </Button>
        </div>

        {/* Center — Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition"
          >
            Men
          </Link>

          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition"
          >
            Women
          </Link>

          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition"
          >
            Uppercloths
          </Link>

          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition"
          >
            Lowercloths
          </Link>
        </div>

        {/* Right — Icons */}
        <div className="flex items-center space-x-4">
          {/* Profile Icon */}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* Shopping Bag */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black "
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 cursor-pointer" />

            {/* Cart Count Badge */}
            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              3
            </span>
          </button>

          {/* Mobile Menu Icon */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full
  bg-white shadow-lg transform transition-transform duration-300 z-50
  ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>

          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
             <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
             <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
             <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottam Wear
            </Link>
             
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
