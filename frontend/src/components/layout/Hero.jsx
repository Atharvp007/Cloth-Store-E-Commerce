import React from "react";
import { Link } from "react-router-dom";
import heroimg from "../../assets/heroimg.jpg";

function Hero() {
  return (
    <section className="relative w-full h-[300px] md:h-[600px] lg:h-[640px]">
      
      {/* Background Image */}
      <img
        src={heroimg}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold uppercase mb-4">
            New <br /> Arrivals
          </h1>

          <p className="text-sm md:text-lg mb-6">
          Fresh drops just landed. Elevate your wardrobe with modern essentials.

          </p>

          <Link
            to="/shop"
            className="bg-white text-black px-6 py-2 rounded-md text-lg font-semibold hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
