import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } 
from "react-icons/hi2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
      const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      console.log(searchTerm);
      setSearchTerm("");
    }
  };
  return (
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      {/* Left — Logo */}
      <div>
          <Link to="/" className="text-2xl font-medium">
      clothify
    </Link>
      </div>

       <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              className="border border-gray-700 dark:border-gray-900 bg-gray-300 dark:bg-gray-900 
                  w-75 hidden md:block"
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
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Men
        </Link>
         <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          women
        </Link>
         <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          uppercloths
        </Link>
         <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          lowercloths
        </Link>
      </div>
      {/* Right — Icons */}
<div className="flex items-center space-x-4">

  {/* Profile Icon */}
  <Link to="/profile" className="hover:text-black">
    <HiOutlineUser className="h-6 w-6 text-gray-700" />
  </Link>

  {/* Shopping Bag */}
  <button className="relative hover:text-black">
    <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />

    {/* Cart Count Badge */}
    <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
      3
    </span>
  </button>

  {/* Mobile Menu Icon */}
  <button className="md:hidden">
    <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
  </button>

</div>

    </nav>
  );
}

export default Navbar;
