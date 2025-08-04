import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { addToWishlist, getWishlist } from "../../services/allApi";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [checkingWishlist, setCheckingWishlist] = useState(true);
  const IMG_BASE_URL = "https://blackterry.in/uploads"

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Check if product is in wishlist when component mounts
    checkWishlistStatus();
  }, []);

  const checkWishlistStatus = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setCheckingWishlist(false);
        return;
      }

      const response = await getWishlist(userId);

      if (response?.data?.items) {
        const isProductInWishlist = response.data.items.some(
          item => item.productId._id === product._id
        );
        setIsInWishlist(isProductInWishlist);
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      toast.error("Failed to check wishlist status");
    } finally {
      setCheckingWishlist(false);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading || checkingWishlist) return;

    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.info("Please login to add items to your wishlist");
        return;
      }

      const reqBody = {
        userId: userId,
        productId: product._id
      };

      const response = await addToWishlist(reqBody);

      if (response.data) {
        // Toggle wishlist status
        setIsInWishlist(!isInWishlist);

        // Show appropriate message based on action
        const message = isInWishlist
          ? "Removed from wishlist successfully"
          : "Added to wishlist successfully";

        toast.success(response.data.message || message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error(error.response?.data?.message || "Failed to update wishlist", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="col-12 col-sm-6 col-md-4 px-1 mb-2"
      data-aos="fade-up"
      data-aos-delay={product.id % 3 * 100}
      data-aos-easing="ease-out-cubic"
    >
      <Link
        to={`/details/${product._id}`}
        className="text-decoration-none text-dark group"
      >
        <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <div className="overflow-hidden">
            <img
              src={`${IMG_BASE_URL}/${product.images[0]}`}
              alt={product.name}
              className="w-100 img-fluid transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{ height: "400px", objectFit: "cover" }}
              data-aos="zoom-in"
            />

          </div>
          <div
            className="absolute bottom-2 right-2"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <button
              onClick={handleAddToWishlist}
              disabled={loading || checkingWishlist}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-0 ${loading || checkingWishlist
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isInWishlist
                    ? 'bg-[#5e3b25] hover:bg-[#4a2e1d] group-hover:scale-110'
                    : 'bg-[#5e3b25] hover:bg-[#4a2e1d] group-hover:scale-110'
                }`}
              title={
                checkingWishlist
                  ? "Checking wishlist..."
                  : isInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
              }
            >
              {checkingWishlist ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : isInWishlist ? (
                <FaHeart color="white" size={16} />
              ) : (
                <FaRegHeart color="white" size={16} />
              )}
            </button>
          </div>
        </div>
        <div
          className="pt-2 pb-2 text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <p className="mb-0 font-medium group-hover:text-[#5e3b25] transition-colors duration-200">
            • {product.title}
          </p>
          <p className="mb-0 font-normal text-gray-700"> ₹ {product.actualPrice}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;