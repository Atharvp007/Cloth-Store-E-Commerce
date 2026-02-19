import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const genders = ["Men", "Women"];
  const materials = ["Cotton","Wool","Denim","Polyester","Silk","Linen","Viscose","Fleece"];
  const brands = ["Urban Threads","Modern Fit","Street Style","Beach Breeze","Fashionista","ChicStyle"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) newFilters[name] = [...(newFilters[name] || []), value];
      else newFilters[name] = (newFilters[name] || []).filter((item) => item !== value);
    } else if (type === "radio") {
      newFilters[name] = value;
    } else if (type === "range") {
      newFilters.maxPrice = value;
      setPriceRange([0, value]);
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
      <h3 className="text-xl font-semibold tracking-widest mb-8 border-b pb-4 text-gray-800">
        FILTERS
      </h3>

      {/* Category */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest text-gray-500 mb-3 uppercase">Category</label>
        {categories.map((category) => (
          <label key={category} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition">{category}</span>
          </label>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest text-gray-500 mb-3 uppercase">Gender</label>
        {genders.map((gender) => (
          <label key={gender} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition">{gender}</span>
          </label>
        ))}
      </div>

      {/* Colors */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest text-gray-500 mb-4 uppercase">Color</label>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              title={color}
              style={{ backgroundColor: color.toLowerCase() }}
              className={`w-8 h-8 rounded-full border-2 border-gray-200 hover:scale-110 transform transition
                ${filters.color === color ? "ring-2 ring-black" : ""}`}
              onClick={() => handleFilterChange({ target: { name: "color", value: color, type: "radio" } })}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest text-gray-500 mb-3 uppercase">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              className={`px-3 py-1 text-xs border rounded-full font-medium transition
                ${filters.size.includes(sz) ? "border-black text-black bg-gray-100" : "border-gray-300 text-gray-700 hover:border-black hover:text-black"}`}
              onClick={() => handleFilterChange({
                target: { name: "size", value: sz, type: "checkbox", checked: !filters.size.includes(sz) }
              })}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest text-gray-500 mb-3 uppercase">Material</label>
        {materials.map((material) => (
          <label key={material} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition">{material}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest text-gray-500 mb-3 uppercase">Brand</label>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center mb-2 cursor-pointer group">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition">{brand}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="block text-xs tracking-widest text-gray-500 mb-3 uppercase">Price</label>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={(e) => handleFilterChange({ target: { name: "maxPrice", value: e.target.value, type: "range" } })}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
