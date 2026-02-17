import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Clothify</h2>
            <p className="text-gray-600 text-sm">
              Trendy fashion for everyone. Discover stylish outfits,
              premium quality, and affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">Men</Link></li>
              <li><Link to="#">Women</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Shipping & Returns</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Email: support@clothify.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Clothify. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
