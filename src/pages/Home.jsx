import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import banner from "/src/assets/homepagelogo.png";
import adds from "/src/assets/ads.png";
import FilterBar from "../Components/Home/Filter";
import ProductGrid from "../Components/Home/ProductGrid";
import ProductDetails from "../Components/Home/SingleProductDetail";
import { getProducts } from "../services/allApi";

function Home() {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await getProducts();
        const latest = response.data
          .filter(product => product.isLatestProduct)
          .slice(0, 6);
        setLatestProducts(latest);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-500">{error}</div>;
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />

      {/* Banner */}
      <div className="w-full flex justify-center items-center">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Latest Products Section */}
      <div className="overflow-hidden mt-[50px] mb-[50px] px-[30px] sm:px-[50px]">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">Latest Products</h2>
          <p className="text-center text-gray-600">Discover our newest arrivals</p>
        </div>
        <FilterBar />
        <ProductGrid products={latestProducts} />
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#6C4A2A]  hover:opacity-90  text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            View More
          </button>
        </div>
      </div>

      <div><ProductDetails /></div>

      <div className="w-full flex justify-center items-center">
        <img
          src={adds}
          alt="Ad Banner"
          className="w-full h-auto object-contain"
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;