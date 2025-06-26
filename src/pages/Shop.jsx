import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import adds from "/src/assets/ads.png";
import ShopFilterBar from "../Components/Shop/Filter";
import ShopProductGrid from "../Components/Shop/ProductGrid";
import { getProducts } from "../services/allApi";

function Shop() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data); 
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filters) => {
    let filtered = [...products];
    
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.features?.gender === filters.category
      );
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => 
        product.actualPrice >= min && product.actualPrice <= max
      );
    }
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <div className="text-center py-20">Loading products...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <div className="text-center py-20 text-red-500">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />

      <div className="overflow-hidden mt-[50px] mb-[50px] px-[30px] sm:px-[50px]">
        <ShopFilterBar 
          productCount={filteredProducts.length} 
          onFilter={handleFilter} 
        />
        <ShopProductGrid products={filteredProducts} />
      </div>

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

export default Shop;