import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import banner from "/src/assets/homepagelogo.png";
import adds from "/src/assets/ads.png";
import tshirt1 from "/src/assets/tshirt1.jpg";
import FilterBar from "../Components/Home/Filter";
import ProductGrid from "../Components/Home/ProductGrid";
import ProductDetails from "../Components/Home/SingleProductDetail";

const tshirts = [
  {
    id: 1,
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },
  {
    id: 1,
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },
  {
    id: 1,
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },
  {
    id: 1,
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },
  {
    id: 1,
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },
  {
    id: 1,
    name: "Black & White",
    subtitle: "Red 911 Batch",
    price: "₹999.00",
    image: tshirt1,
  },

];

function Home() {
  const navigate = useNavigate();

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


      {/* Product Listing Section */}
      <div className="overflow-hidden mt-[50px] mb-[50px] px-[30px] sm:px-[50px]">
        <FilterBar productCount={tshirts.length} />
        <ProductGrid products={tshirts} />
      </div>

      <div><ProductDetails></ProductDetails></div>

      {/* Ad Banner */}
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