import React from "react";
import menc from "../../assets/menc.jpg";
import womenc from "../../assets/womenc.jpg";
import { Link } from "react-router-dom";

function GenCollection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Women's Collection */}
        <div className="relative flex-1 group overflow-hidden rounded-lg shadow-lg">
          <img
            src={womenc}
            alt="Women's Collection"
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-6 right-6 bg-black/60 text-white p-5 rounded-md max-w-xs text-right">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
              Women's Collection
            </h2>

            <Link
              to="/collections/all?gender=Women"
              className="inline-block bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 group overflow-hidden rounded-lg shadow-lg">
          <img
            src={menc}
            alt="Men's Collection"
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-6 left-6 bg-black/60 text-white p-5 rounded-md max-w-xs">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
              Men's Collection
            </h2>

            <Link
              to="/collections/all?gender=Men"
              className="inline-block bg-white text-black px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default GenCollection;
