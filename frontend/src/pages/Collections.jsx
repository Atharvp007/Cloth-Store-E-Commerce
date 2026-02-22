import { useEffect, useState, useRef } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import FilterSidebar from "../components/products/Filtersidebar.jsx";
import SortOptions from "../components/products/SortOptions.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const sidebarRef = useRef(null);

  /* ---------------- Page Entrance Animation ---------------- */
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 150);
  }, []);

  /* ---------------- Toggle Sidebar ---------------- */
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  /* ---------------- Close Sidebar Outside Click ---------------- */
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  /* ---------------- Dummy Products ---------------- */
  useEffect(() => {
    const defaultProducts = [
      { _id: "1", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=1" }] },
      { _id: "2", name: "Stylish Jacket", price: 90, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
      { _id: "3", name: "Stylish Jacket", price: 180, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
      { _id: "4", name: "Stylish Jacket", price: 140, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
      { _id: "5", name: "Stylish Jacket", price: 220, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
      { _id: "6", name: "Stylish Jacket", price: 110, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
    ];

    setTimeout(() => setProducts(defaultProducts), 400);
  }, []);

  return (
    <div
      className={`flex min-h-screen bg-gray-50 relative transition-all duration-700
      ${pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >

      {/* ================= MOBILE FILTER BUTTON ================= */}
      <button
        onClick={toggleSidebar}
        className="
        lg:hidden fixed bottom-6 right-6 z-40
        flex items-center gap-2
        bg-black text-white px-6 py-3
        rounded-full shadow-xl
        hover:scale-105 hover:shadow-2xl
        active:scale-95
        transition-all duration-300
        "
      >
        <FaFilter />
        Filters
      </button>

      {/* ================= OVERLAY ================= */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40
        transition-opacity duration-300 lg:hidden
        ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* ================= FILTER SIDEBAR ================= */}
      <div
        ref={sidebarRef}
        className={`
        fixed top-0 left-0 h-full w-72 bg-white z-50
        shadow-2xl transform transition-transform duration-500 ease-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h3 className="font-semibold text-lg">Filters</h3>
          <FaTimes
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <FilterSidebar />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow p-6 lg:ml-6">

        {/* ===== PREMIUM PAGE HEADER ===== */}
        <div className="border-b pb-8 mb-8">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            All Collections
          </h2>

          <p className="text-gray-500 mt-3 text-base max-w-xl">
            Discover curated pieces designed with precision, comfort, and modern aesthetics.
          </p>

          <div className="mt-6 h-[2px] w-20 bg-black rounded-full"></div>
        </div>

        {/* ===== SORT OPTIONS (CLEAN VERSION) ===== */}
        <div className="mb-8 flex justify-end">
          <SortOptions />
        </div>

        {/* ===== PRODUCT GRID ===== */}
        <ProductGrid products={products} />

      </div>
    </div>
  );
};

export default CollectionPage;