import React, { useEffect, useState } from "react";
import axios from "axios";

import NewArrivals from "../components/products/NewArrivals";
import Hero from "../components/layout/Hero";
import GenCollection from "../components/products/GenCollection";
import ProductDetails from "../components/products/ProductDetails";
import Featured from "../components/products/Featured";
import Features from "../components/products/Features";

function Home() {
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSeller();
  }, []);

  return (
    <div>
      <Hero />
      <GenCollection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">
        Best Seller
      </h2>

      {loading && (
        <p className="text-center">Loading best seller product...</p>
      )}

      {!loading && bestSellerProduct && (
        <ProductDetails productId={bestSellerProduct._id} />
      )}

      <Featured />
      <Features />
    </div>
  );
}

export default Home;