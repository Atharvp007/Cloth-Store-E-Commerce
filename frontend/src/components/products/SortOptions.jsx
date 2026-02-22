import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const SortOptions = ({ onSortChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Popular");
  const dropdownRef = useRef(null);

  /* -------- Sort Options -------- */
  const sortItems = [
    { label: "Popular", value: "popular" },
    { label: "Price: Low to High", value: "priceLow" },
    { label: "Price: High to Low", value: "priceHigh" },
  ];

  /* -------- Toggle dropdown -------- */
  const toggleDropdown = () => setOpen((prev) => !prev);

  /* -------- Close on outside click -------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------- Select option -------- */
  const handleSelect = (item) => {
    setSelected(item.label);
    setOpen(false);

    if (onSortChange) {
      onSortChange(item.value);
    }
  };

  return (
    <div className="flex justify-end mb-6 relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3
        border border-gray-300
        px-5 py-2.5
        rounded-full
        bg-white
        shadow-sm hover:shadow-md
        transition-all duration-300"
      >
        <span className="text-sm font-medium">
          Sort: {selected}
        </span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-14 w-56 bg-white
        rounded-xl shadow-xl border overflow-hidden
        transition-all duration-300 origin-top
        ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {sortItems.map((item) => (
          <button
            key={item.value}
            onClick={() => handleSelect(item)}
            className={`w-full text-left px-5 py-3 text-sm
            transition-all duration-200
            hover:bg-gray-100
            ${
              selected === item.label
                ? "bg-gray-100 font-semibold"
                : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;