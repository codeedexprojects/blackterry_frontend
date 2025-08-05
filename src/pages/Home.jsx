import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";
import banner from "/src/assets/homepagelogo.png";
import adds from "/src/assets/ads.png";
import FilterBar from "../Components/Home/Filter";
import ProductGrid from "../Components/Home/ProductGrid";
import ProductDetails from "../Components/Home/SingleProductDetail";
import { getProducts, getCarousels } from "../services/allApi";
import ProductCarousel from "../Components/Shop/FeatureProduct";

function Home() {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback carousel images in case API fails
  const fallbackCarouselImages = [
    { image: banner, title: "Welcome to Our Store", link: "/shop" },
    { image: adds, title: "Special Offers", link: "/shop" },
  ];

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

    const fetchCarouselData = async () => {
      try {
        const response = await getCarousels();
        if (response?.data?.success && response.data.data) {
          // Filter only active carousels
          const activeCarousels = response.data.data.filter(carousel => carousel.isActive);
          setCarouselData(activeCarousels.length > 0 ? activeCarousels : fallbackCarouselImages);
        } else {
          setCarouselData(fallbackCarouselImages);
        }
      } catch (err) {
        console.error("Failed to fetch carousel data:", err);
        setCarouselData(fallbackCarouselImages);
      } finally {
        setCarouselLoading(false);
      }
    };

    fetchLatestProducts();
    fetchCarouselData();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (carouselData.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % carouselData.length);
      }, 4000);

      return () => clearInterval(slideInterval);
    }
  }, [carouselData.length]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => prev === 0 ? carouselData.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % carouselData.length);
  };

  const handleCarouselClick = (carousel) => {
    if (carousel.link) {
      if (carousel.link.startsWith('http')) {
        // External link
        window.open(carousel.link, '_blank');
      } else {
        // Internal link
        navigate(carousel.link);
      }
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imageName) => {
    // Assuming your images are served from a base URL
    // Replace 'YOUR_BASE_IMAGE_URL' with your actual image server URL
    const BASE_IMAGE_URL =  'https://blackterry.in/uploads/';
    return `${BASE_IMAGE_URL}${imageName}`;
  };

  return (
    <div>
      <Header />
      
      {/* Carousel Section */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900"> 
        {carouselLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div 
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselData.map((carousel, index) => (
                <div key={carousel._id || index} className="min-w-full h-full relative">
                  <img
                    src={carousel.image ? getImageUrl(carousel.image) : carousel.image || banner}
                    alt={carousel.title || `Slide ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform duration-[4000ms] ease-in-out hover:scale-110 cursor-pointer"
                    style={{
                      transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 4000ms ease-in-out'
                    }}
                    onClick={() => handleCarouselClick(carousel)}
                  />    
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white z-10">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        {carousel.title || "Welcome to Our Store"}
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
                        Discover Amazing Products
                      </p>
                      <button
                        onClick={() => handleCarouselClick(carousel)}
                        className="bg-[#6C4A2A] hover:bg-[#5A3D22] text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        {carousel.link ? "Learn More" : "Shop Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition duration-300 ease-in-out ${
                    currentSlide === index 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Latest Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest Products
          </h2>
          <p className="text-lg text-gray-600">
            Discover our newest arrivals
          </p>
        </div>
        <ProductGrid products={latestProducts} loading={loading} error={error} />
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#6C4A2A] hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            View More
          </button>
        </div>
      </div>
      
      <ProductDetails />
      <ProductCarousel />
      <Footer />
    </div>
  );
}

export default Home;