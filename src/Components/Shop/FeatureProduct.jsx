import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/allApi";

export default function StaggeredCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Base URL for images
  const IMAGE_BASE_URL = "https://blackterry.in/uploads/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.data) {
          // Filter only products that are marked as latest
          const latestProducts = response.data.filter(product => product.isLatestProduct);
          setProducts(latestProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${IMAGE_BASE_URL}${imagePath}`;
  };

  if (loading) {
    return (
      <div className="w-full py-12 px-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 px-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full py-12 px-8 text-center text-gray-500">
        No latest products available
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto py-12 px-8">
      <div className="flex gap-8">
        {products.map((product, idx) => {
          const isBig = idx % 2 === 0;
          // Get the first image or use a placeholder if no images exist
          const firstImage = product.images?.length > 0 
            ? getImageUrl(product.images[0])
            : null;

          return (
            <div
              key={product._id}
              className={`flex-shrink-0 w-64 rounded-3xl overflow-hidden shadow-md ${
                isBig ? "h-96" : "h-80 mt-12"
              } bg-white cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => navigate(`/details/${product._id}`)}
            >
              {firstImage ? (
                <img
                  src={firstImage}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x500?text=Image+Not+Available";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              
            </div>
          );
        })}
      </div>
    </div>
  );
}