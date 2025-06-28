import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaChevronLeft,
  FaChevronRight,
  FaRegUser,
} from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { IoBagHandleOutline, IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { getTextSlider } from '../services/allApi';

const Header = () => {
  const [textSliders, setTextSliders] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch text slider data
  useEffect(() => {
    const fetchTextSliders = async () => {
      try {
        setIsLoading(true);
        const response = await getTextSlider();
        if (response?.data?.success && response.data.data) {
          // Filter only active sliders
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

  // Auto-slide functionality
  useEffect(() => {
    if (textSliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => 
        (prevIndex + 1) % textSliders.length
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [textSliders.length]);

  // Manual navigation functions
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

  // Get current slide text
  const getCurrentSlideText = () => {
    if (isLoading) return 'Loading...';
    if (textSliders.length === 0) return 'BLACK TERRY';
    return textSliders[currentSlideIndex]?.title || 'BLACK TERRY';
  };

  return (
    <header className="w-full">
      {/* Top strip with auto-sliding text */}
      <div className="flex items-center justify-between bg-[#D9CEBF] px-4 py-3 sm:py-4 text-sm text-[#5c4432] relative overflow-hidden">
        <FaChevronLeft 
          className="cursor-pointer hover:opacity-70 transition-opacity z-10" 
          onClick={goToPrevious}
        />
        
        {/* Text slider container */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-full max-w-xs">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlideIndex * 100}%)`,
                width: `${textSliders.length * 100}%`
              }}
            >
              {textSliders.length > 0 ? (
                textSliders.map((slider, index) => (
                  <div
                    key={slider._id}
                    className="w-full flex-shrink-0 text-center"
                    style={{ width: `${100 / textSliders.length}%` }}
                  >
                    <span className="text-xs font-medium tracking-widest uppercase">
                      {slider.title}
                    </span>
                  </div>
                ))
              ) : (
                <div className="w-full text-center">
                  <span className="text-xs font-medium tracking-widest uppercase">
                    {isLoading ? 'Loading...' : 'BLACK TERRY'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Slide indicators (dots) */}
          {textSliders.length > 1 && (
            <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 flex gap-1">
              {textSliders.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentSlideIndex 
                      ? 'bg-[#5c4432]' 
                      : 'bg-[#5c4432]/30'
                  }`}
                  onClick={() => setCurrentSlideIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        
        <FaChevronRight 
          className="cursor-pointer hover:opacity-70 transition-opacity z-10" 
          onClick={goToNext}
        />
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white">
        {/* Left menu */}
        <nav className="flex gap-6 text-sm mb-2 sm:mb-0">
          <a
            href="/"
            className="text-black hover:text-[#D9CEBF] text-decoration-none transition-colors"
          >
            NEW
          </a>
          <a
            href="/shop"
            className="text-black hover:text-[#D9CEBF] text-decoration-none transition-colors"
          >
            SHOP
          </a>
          <a
            href="/about"
            className="text-black hover:text-[#D9CEBF] text-decoration-none transition-colors"
          >
            ABOUT
          </a>
          <a
            href="/contact"
            className="text-black hover:text-[#D9CEBF] text-decoration-none transition-colors"
          >
            CONTACT
          </a>
        </nav>

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-black">
          BLACK TERRY
        </h1>

        <div className="flex gap-4 mt-2 sm:mt-0 text-lg">
          <Link
            to="/search"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <IoSearchSharp className="cursor-pointer" />
          </Link>
          
          <Link
            to="/wishlist"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <GrFavorite className="cursor-pointer" />
          </Link>
          <Link
            to="/cart"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <IoBagHandleOutline className="cursor-pointer" />
          </Link>
          <Link
            to="/profile"
            className="text-black hover:text-[#D9CEBF] transition-colors"
          >
            <FaRegUser className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;