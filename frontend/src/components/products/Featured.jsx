import { Link } from "react-router-dom";
import home2 from "../../assets/home2.jpg";

const Featured = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl overflow-hidden shadow-lg">

        {/* LEFT CONTENT */}
        <div className="lg:w-1/2 p-8 lg:p-12 text-center lg:text-left">

          <h2 className="text-sm font-semibold tracking-widest text-gray-600 uppercase mb-3">
            New Season Collection
          </h2>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Style That <span className="text-gray-700">Moves With You</span>
          </h1>

          <p className="text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Upgrade your wardrobe with premium everyday essentials designed
            for comfort, confidence, and modern living. From casual wear to
            statement pieces — discover fashion made to fit your lifestyle.
          </p>

          <Link
            to="/collections/all"
            className="
              inline-block
              bg-black text-white
              px-8 py-3
              rounded-full
              text-lg font-semibold tracking-wide
              transition-all duration-300
              hover:bg-gray-800
              hover:shadow-xl
              hover:-translate-y-1
              active:scale-95
            "
          >
            Explore Collection →
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:w-1/2 flex justify-center items-center p-6">
          <img
            src={home2}
            alt="Fashion Collection"
            className="w-[85%] max-h-[420px] object-cover rounded-3xl
            transition duration-500 hover:scale-105 shadow-md"
          />
        </div>

      </div>
    </section>
  );
};

export default Featured;
