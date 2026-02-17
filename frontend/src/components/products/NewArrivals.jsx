import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.firstChild.offsetWidth + 24;

    if (direction === "left") {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const products = [
    { _id: "1", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=1" }] },
    { _id: "2", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2" }] },
    { _id: "3", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=3" }] },
    { _id: "4", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=4" }] },
    { _id: "5", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=5" }] },
    { _id: "6", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=6" }] },
  ];

  return (
    <section className="py-12">
      
      {/* Header */}
      <div className="container mx-auto text-center mb-10 px-4">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600">
          Discover the latest styles straight off the runway.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="container mx-auto px-4 relative">

        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                     bg-white/80 backdrop-blur-md 
                     hover:bg-black hover:text-white
                     text-black p-3 rounded-full shadow-lg 
                     transition duration-300"
        >
          <FiChevronLeft size={22} />
        </button>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                     bg-white/80 backdrop-blur-md 
                     hover:bg-black hover:text-white
                     text-black p-3 rounded-full shadow-lg 
                     transition duration-300"
        >
          <FiChevronRight size={22} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] snap-start"
            >
              <Link to={`/product/${product._id}`} className="block cursor-pointer">
                <div className="relative group">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] 
                               object-cover rounded-lg 
                               transition-transform duration-500 
                               group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 right-0 
                                  bg-black/50 text-white p-4 
                                  rounded-b-lg">
                    <h4 className="font-medium text-lg">{product.name}</h4>
                    <p className="mt-1">${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
