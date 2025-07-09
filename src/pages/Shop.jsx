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
    
    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter(product => 
        product.features?.gender === filters.gender
      );
    }
    
    // Material filter
    if (filters.material) {
      filtered = filtered.filter(product => 
        product.features?.material === filters.material
      );
    }
    
    // Fit filter
    if (filters.fit) {
      filtered = filtered.filter(product => 
        product.features?.fit === filters.fit
      );
    }
    
    // Occasion filter
    if (filters.occasion) {
      filtered = filtered.filter(product => 
        product.features?.occasion === filters.occasion
      );
    }
    
    // Price range filter
    if (filters.priceRange) {
      if (filters.priceRange === '5000+') {
        filtered = filtered.filter(product => 
          product.actualPrice >= 5000
        );
      } else {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter(product => 
          product.actualPrice >= min && product.actualPrice <= max
        );
      }
    }
    
    // Availability filter
    if (filters.availability) {
      if (filters.availability === 'In Stock') {
        filtered = filtered.filter(product => 
          product.totalStock > 0
        );
      } else if (filters.availability === 'Out of Stock') {
        filtered = filtered.filter(product => 
          product.totalStock === 0
        );
      }
    }
    
    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low-high':
          filtered.sort((a, b) => a.actualPrice - b.actualPrice);
          break;
        case 'price-high-low':
          filtered.sort((a, b) => b.actualPrice - a.actualPrice);
          break;
        case 'name-a-z':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-z-a':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'popularity':
          filtered.sort((a, b) => b.orderCount - a.orderCount);
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <div className="text-center py-20">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <div className="text-center py-20">
          <div className="alert alert-danger d-inline-block" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
          <div className="mt-3">
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
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
          products={products}
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