import React from "react";
import {
  HiShoppingBag,
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
} from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Why Shop With Us
        </h2>
        <p className="text-gray-500 mt-3">
          Premium fashion. Seamless experience. Trusted worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
        {/* Feature 1 */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-black text-white mb-6 group-hover:scale-110 transition">
            <HiShoppingBag className="text-2xl" />
          </div>
          <h4 className="text-lg font-semibold tracking-tight mb-2">
            Free Worldwide Shipping
          </h4>
          <p className="text-gray-500 text-sm">
            Complimentary shipping on all orders over $150.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-black text-white mb-6 group-hover:scale-110 transition">
            <HiArrowPathRoundedSquare className="text-2xl" />
          </div>
          <h4 className="text-lg font-semibold tracking-tight mb-2">
            30-Day Easy Returns
          </h4>
          <p className="text-gray-500 text-sm">
            Hassle-free returns for a worry-free shopping experience.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-black text-white mb-6 group-hover:scale-110 transition">
            <HiOutlineCreditCard className="text-2xl" />
          </div>
          <h4 className="text-lg font-semibold tracking-tight mb-2">
            Secure Payments
          </h4>
          <p className="text-gray-500 text-sm">
            Safe & encrypted checkout with trusted payment methods.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
