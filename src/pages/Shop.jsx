import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import adds from "/src/assets/ads.png";
import ShopFilterBar from "../Components/Shop/Filter";
import ShopProductGrid from "../Components/Shop/ProductGrid";
import { getProducts, searchProducts } from "../services/allApi";

function Shop() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get search query from URL parameters
  const getSearchQuery = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('search') || '';
  };

  useEffect(() => {
    const currentSearchQuery = getSearchQuery();
    
    if (currentSearchQuery) {
      // If there's a search query, perform search
      handleSearch(currentSearchQuery);
      setSearchQuery(currentSearchQuery);
      setIsSearchResult(true);
    } else {
      // If no search query, fetch all products
      fetchAllProducts();
      setIsSearchResult(false);
      setSearchQuery("");
    }
  }, [location.search]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
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

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await searchProducts(query);
      
      if (response && response.data) {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsSearchResult(true);
      } else {
        setProducts([]);
        setFilteredProducts([]);
        setIsSearchResult(true);
      }
    } catch (err) {
      console.error("Failed to search products:", err);
      setError("Failed to search products. Please try again later.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

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

  const clearSearch = () => {
    navigate('/shop');
  };

  if (loading) {
    return (
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <div className="text-center py-20">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">
            {isSearchResult ? `Searching for "${searchQuery}"...` : "Loading products..."}
          </p>
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
              className="btn btn-primary me-2"
            >
              Try Again
            </button>
            {isSearchResult && (
              <button 
                onClick={clearSearch} 
                className="btn btn-secondary"
              >
                Clear Search
              </button>
            )}
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
        {/* Search Results Header */}
        {isSearchResult && (
          <div className="mb-6 p-4 bg-[#D9CEBF]/20 rounded-lg border border-[#D9CEBF]/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-sm text-gray-600">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-[#5c4432] text-white rounded-lg hover:bg-[#4a3529] transition-colors text-sm"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {isSearchResult && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found for "{searchQuery}"
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or browse our categories
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-[#5c4432] text-white rounded-lg hover:bg-[#4a3529] transition-colors"
              >
                Browse All Products
              </button>
            </div>
          </div>
        )}

        {/* Filter Bar and Product Grid */}
        {filteredProducts.length > 0 && (
          <>
            <ShopFilterBar 
              productCount={filteredProducts.length} 
              onFilter={handleFilter}
              products={products}
            />
            <ShopProductGrid products={filteredProducts} />
          </>
        )}
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