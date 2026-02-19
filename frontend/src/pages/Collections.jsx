import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/Filtersidebar.jsx";
import SortOptions from "../components/products/SortOptions.jsx";
import ProductGrid from "../components/products/ProductGrid.jsx";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const defaultProducts = [
      { _id: "1", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=1" }] },
    { _id: "2", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
    { _id: "3", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
    { _id: "4", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
    { _id: "5", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
    { _id: "6", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
    ];

    setTimeout(() => {
      setProducts(defaultProducts);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center bg-white shadow-md"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white shadow-lg overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold uppercase mb-4">
          All Collection
        </h2>

        <SortOptions />

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
