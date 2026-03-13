import { useEffect, useState, useRef } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

import FilterSidebar from "../components/products/Filtersidebar.jsx";
import SortOptions from "../components/products/SortOptions.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const queryParams = Object.fromEntries([...searchParams]);
  const searchQuery = queryParams.search || "";
  const sortOption = queryParams.sort || "popular";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const sidebarRef = useRef(null);

  /* ---------------- Page Entrance Animation ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------- Animate + Fetch Products ---------------- */
  useEffect(() => {
    setContentVisible(false);

    const timer = setTimeout(() => {
      dispatch(fetchProductsByFilters({ collection, ...queryParams }));
      setContentVisible(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [dispatch, collection, searchParams]);

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

  /* ---------------- SEARCH FILTER ---------------- */
  let filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...products];

  /* ---------------- SORTING ---------------- */

  // Popular = newest products
  if (sortOption === "popular") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  // Price Low → High
  if (sortOption === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  // Price High → Low
  if (sortOption === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

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
      <div
        className={`flex-grow p-6 lg:ml-6 transition-all duration-500 ease-in-out
        ${
          contentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        {/* ===== PAGE HEADER ===== */}
        <div className="border-b pb-8 mb-8">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            All Collections
          </h2>

          <p className="text-gray-500 mt-3 text-base max-w-xl">
            Discover curated pieces designed with precision, comfort, and
            modern aesthetics.
          </p>

          <div className="mt-6 h-[2px] w-20 bg-black rounded-full"></div>
        </div>

        {/* ===== SORT OPTIONS ===== */}
        <div className="mb-8 flex justify-end">
          <SortOptions />
        </div>

        {/* ===== SEARCH RESULT TEXT ===== */}
        {searchQuery && (
          <div className="mb-6 text-gray-600 text-sm">
            Showing results for{" "}
            <span className="font-semibold text-black">
              "{searchQuery}"
            </span>
          </div>
        )}

        {/* ===== PRODUCTS / NO RESULTS ===== */}
        {filteredProducts.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>

            <h3 className="text-xl font-semibold text-gray-800">
              No products found
            </h3>

            <p className="text-gray-500 mt-2 max-w-md">
              We couldn't find any products matching your search. Try using
              different keywords.
            </p>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;