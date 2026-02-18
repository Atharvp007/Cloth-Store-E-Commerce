import React from "react";
import { Link } from "react-router-dom";
import heroimg from "../../assets/HOME.png";

function Hero() {
  return (
    <section className="relative w-full h-[350px] md:h-[620px] lg:h-[750px] overflow-hidden">

      {/* Background Image */}
      <img
        src={heroimg}
        alt="Hero"
        className="
          absolute inset-0 w-full h-full object-cover
          brightness-110 contrast-110
        "
      />

      {/* Light Premium Overlay (reduced darkness) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

      {/* Content - LEFT MIDDLE */}
      <div className="absolute inset-0 flex items-center">
        <div className="text-white px-8 md:px-16 lg:px-24 max-w-xl">

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight tracking-wide">
            New <br />
            <span className="text-gray-200">Arrivals</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-sm md:text-lg text-gray-200 leading-relaxed">
            Fresh styles crafted for comfort and confidence.
            Discover everyday fashion designed to move with you.
          </p>

          {/* Button */}
          <div className="mt-8">
            <Link
              to="/shop"
              className="
                inline-block
                px-10 py-3
                rounded-full
                text-lg font-semibold tracking-wide
                bg-white text-black
                transition-all duration-300
                hover:shadow-xl
                hover:-translate-y-1
                active:scale-95
              "
            >
              Shop Now →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
