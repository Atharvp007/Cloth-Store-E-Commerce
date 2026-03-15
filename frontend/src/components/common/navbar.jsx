
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3,
} from "react-icons/hi2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/shopping-bag.png";
import CartDrawer from "../layout/CartDrawer.jsx";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const suggestionRef = useRef(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
 const user = useSelector((state) => state.auth.user);
  const { products } = useSelector((state) => state.products);

  const cartItemCount =
    cart?.products?.reduce(
      (total, product) => total + (product.quantity || 0),
      0
    ) || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;

    navigate(`/collections/all?search=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
    setSearchTerm("");
  };

  const handleSuggestionClick = (name) => {
    navigate(`/collections/all?search=${encodeURIComponent(name)}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">

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

          <form
            onSubmit={handleSearch}
            className="relative hidden md:block"
            ref={suggestionRef}
          >
            <Input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 bg-gray-100 w-72 pr-12 focus:ring-2 focus:ring-black"
              value={searchTerm}
              autoComplete="off"
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
            />

            <Button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-black hover:bg-gray-800"
            >
              <FaSearch />
            </Button>

            {showSuggestions && searchTerm && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">

                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product._id}
                      onClick={() =>
                        handleSuggestionClick(product.name)
                      }
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {product.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">
                    No products found
                  </div>
                )}

              </div>
            )}
          </form>

          <div className="hidden md:flex space-x-8">

            <Link
              to="/collections/all?gender=Men"
              className="text-gray-700 text-sm font-medium uppercase tracking-wide relative group"
            >
              Men
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/collections/all?gender=Women"
              className="text-gray-700 text-sm font-medium uppercase tracking-wide relative group"
            >
              Women
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/collections/all?category=Top Wear"
              className="text-gray-700 text-sm font-medium uppercase tracking-wide relative group"
            >
              Top Wear
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/collections/all?category=Bottom Wear"
              className="text-gray-700 text-sm font-medium uppercase tracking-wide relative group"
            >
              Bottom Wear
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>

          <div className="flex items-center space-x-5">

            {user && user.role === "admin" && (
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
            )}

            <Link to="/profile" className="hover:scale-110 transition">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>

            <button
              onClick={toggleCartDrawer}
              className="relative hover:scale-110 transition"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 cursor-pointer" />

              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3 className="h-6 w-6 text-gray-700" />
            </button>

          </div>
        </div>
      </nav>

      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

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

        <div className="flex flex-col px-6 space-y-6 mt-4 text-gray-700 font-medium">

          <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer}>
            Men
          </Link>

          <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer}>
            Women
          </Link>

          <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer}>
            Top Wear
          </Link>

          <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer}>
            Bottom Wear
          </Link>

          <Link to="/profile" onClick={toggleNavDrawer}>
            Profile
          </Link>

        </div>
      </div>
    </>
  );
}

export default Navbar;
