import React, { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegUser,
  FaTimes,
} from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { IoBagHandleOutline, IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getTextSlider, getCart } from '../services/allApi';
import image from '../assets/logoname.png';

const Header = ({ cartUpdated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [textSliders, setTextSliders] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const fetchTextSliders = async () => {
      try {
        setIsLoading(true);
        const response = await getTextSlider();
        if (response?.data?.success && response.data.data) {
          const activeSliders = response.data.data.filter(slider => slider.isActive);
          setTextSliders(activeSliders);
        }
      } catch (error) {
        console.error('Error fetching text sliders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTextSliders();
  }, []);

  const fetchCartData = async () => {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('userToken');

    if (!userId || !userToken) {
      setCartCount(0);
      return;
    }

    try {
      const response = await getCart(userId);
      if (response.data && response.data.items) {
        setCartCount(response.data.items.length || 0);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [cartUpdated]);

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (textSliders.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        (prevIndex + 1) % textSliders.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [textSliders.length, isHovered]);

  const goToPrevious = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? textSliders.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentSlideIndex((prevIndex) =>
      (prevIndex + 1) % textSliders.length
    );
  };

  const getCurrentSlideText = () => {
    if (isLoading) return 'Loading...';
    if (textSliders.length === 0) return 'BLACK TERRY';
    return textSliders[currentSlideIndex]?.title || 'BLACK TERRY';
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <header className="w-full">
      {/* Top Slider Section */}
      <div
        className="flex items-center justify-between bg-[#D9CEBF] px-4 py-3 text-sm text-[#5c4432] relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={goToPrevious}
          className="z-10 p-1 rounded-full hover:bg-[#5c4432]/10 transition-colors"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 mx-4 overflow-hidden">
          <div className="relative w-full h-6">
            <div
              className="absolute top-0 left-0 w-full h-full flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`,
              }}
            >
              {textSliders.length > 0 ? (
                textSliders.map((slider) => (
                  <div
                    key={slider._id}
                    className="flex-shrink-0 w-full flex items-center justify-center"
                  >
                    <span className="text-xs font-medium tracking-wider uppercase whitespace-nowrap">
                      {slider.title}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex-shrink-0 w-full flex items-center justify-center">
                  <span className="text-xs font-medium tracking-wider uppercase">
                    {isLoading ? 'Loading...' : 'BLACK TERRY'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="z-10 p-1 rounded-full hover:bg-[#5c4432]/10 transition-colors"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white relative">
        {/* Navigation Links */}
        <nav className="flex gap-6 text-sm mb-2 sm:mb-0">
          <Link 
            to="/" 
            className={`no-underline text-black hover:text-[#806248] transition-colors ${isActive('/') ? 'text-[#806248] font-medium' : ''}`}
            style={{textDecoration: 'none'}}
          >
            NEW
          </Link>
          <Link 
            to="/shop" 
             style={{textDecoration: 'none'}}
            className={`no-underline text-black hover:text-[#806248] transition-colors ${isActive('/shop') ? 'text-[#806248] font-medium' : ''}`}
          >
            SHOP
          </Link>
          <Link 
            to="/about" 
             style={{textDecoration: 'none'}}
            className={`no-underline text-black hover:text-[#806248] transition-colors ${isActive('/about') ? 'text-[#806248] font-medium' : ''}`}
          >
            ABOUT
          </Link>
          <Link 
            to="/contact" 
             style={{textDecoration: 'none'}}
            className={`no-underline text-black hover:text-[#806248] transition-colors ${isActive('/contact') ? 'text-[#806248] font-medium' : ''}`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Logo */}
        <Link to="/" className="no-underline">
          <img
            src={image}
            alt="BLACK TERRY Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Icons */}
        <div className="flex gap-4 mt-2 sm:mt-0 text-lg">
          <button
            onClick={handleSearchClick}
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <IoSearchSharp className="cursor-pointer" />
          </button>
          <Link 
            to="/wishlist" 
            className="no-underline text-black hover:text-[#D9CEBF] transition-colors"
          >
            <GrFavorite className="cursor-pointer" />
          </Link>
          <Link 
            to="/cart" 
            className="no-underline text-black hover:text-[#D9CEBF] transition-colors relative"
          >
            <IoBagHandleOutline className="cursor-pointer" />
            <span className={`absolute -top-2 -right-2 bg-[#5c4432] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ${cartCount === 0 ? 'opacity-70' : ''}`}>
              {cartCount}
            </span>
          </Link>
          <Link 
            to="/profile" 
            className="no-underline text-black hover:text-[#D9CEBF] transition-colors"
          >
            <FaRegUser className="cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Search Products</h2>
                <button
                  onClick={handleSearchClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9CEBF] focus:border-transparent text-gray-800 placeholder-gray-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#5c4432] transition-colors"
                >
                  <IoSearchSharp className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-4 text-sm text-gray-600">
                <p>Press Enter or click the search icon to find products</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;