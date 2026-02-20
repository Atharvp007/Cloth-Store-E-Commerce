import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;

    if (sortBy) {
      setSearchParams({ sortBy });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 px-4 md:px-0">
      
      {/* Title / Heading */}
      <h2 className="text-2xl font-bold text-gray-800">
        All Products
      </h2>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-200">
        <span className="text-sm font-medium text-gray-600">
          Sort by
        </span>
        <select
          id="sort"
          onChange={handleSortChange}
          value={searchParams.get("sortBy") || ""}
          className="
            bg-transparent 
            text-sm 
            font-medium 
            text-gray-800 
            focus:outline-none 
            cursor-pointer
          "
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;
