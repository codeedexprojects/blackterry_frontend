import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, getProducts, buyNow } from "../../services/allApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  const handleViewDetails = ()=>{
    navigate(`/details/${currentProduct._id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        const productsData = response.data;
        
        const offerProducts = productsData.filter(product => product.isOfferProduct);
        const latestOfferProduct = offerProducts.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        
        setCurrentProduct(latestOfferProduct);
        
        if (latestOfferProduct && latestOfferProduct.colors.length > 0) {
          const firstColor = latestOfferProduct.colors[0];
          setSelectedColor(firstColor.color);
          
          const availableSize = firstColor.sizes.find(size => size.stock > 0);
          if (availableSize) {
            setSelectedSize(availableSize.size);
          }
        }
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.info("Please login to add items to your cart");
        return;
      }

      if (!selectedColor) {
        toast.error("Please select a color");
        return;
      }

      if (!selectedSize) {
        toast.error("Please select a size");
        return;
      }

      const reqBody = {
        userId: userId,
        productId: currentProduct._id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
      };

      const response = await addToCart(reqBody);

      if (response.data) {
        toast.success("Item added to cart successfully!");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add item to cart");
    }
  };

  const handleBuyNow = async () => {
    try {
      setBuyNowLoading(true);
      
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.info("Please login to proceed with purchase");
        return;
      }

      if (!selectedColor) {
        toast.error("Please select a color");
        return;
      }

      if (!selectedSize) {
        toast.error("Please select a size");
        return;
      }

      const reqBody = {
        userId: userId,
        productId: currentProduct._id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
      };

      const response = await buyNow(reqBody);

      if (response && response.status === 201) {
        const checkoutId = response.data.checkoutId;
        navigate("/checkout", {
          state: {
            checkoutId: checkoutId,
          },
        });
      } else {
        console.error('Buy now failed:', response);
        toast.error("Failed to proceed with purchase");
      }
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error(error.response?.data?.message || "Failed to proceed with purchase");
    } finally {
      setBuyNowLoading(false);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    const colorData = currentProduct.colors.find(c => c.color === color);
    if (colorData) {
      const availableSize = colorData.sizes.find(size => size.stock > 0);
      setSelectedSize(availableSize ? availableSize.size : "");
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "inc") {
      setQuantity(prev => prev + 1);
    } else if (action === "dec" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const getAvailableSizes = () => {
    if (!currentProduct || !selectedColor) return [];
    
    const colorData = currentProduct.colors.find(c => c.color === selectedColor);
    return colorData ? colorData.sizes : [];
  };

  const getProductImage = () => {
    if (currentProduct?.images && currentProduct.images.length > 0) {
      return `/api/images/${currentProduct.images[0]}`;
    }
    return "/default-tshirt.jpg";
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !currentProduct) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-lg">No offer products available</div>
      </div>
    );
  }

  const displayPrice = currentProduct.offerPrice || currentProduct.actualPrice;

  return (
   <div>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="w-full">
        <img
          src={getProductImage()}
          alt={currentProduct.title}
          className="w-full h-auto object-contain"
          onError={(e) => {
            e.target.src = "/default-tshirt.jpg";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{currentProduct.title}</h2>
        <p className="text-2xl font-bold">₹ {displayPrice}</p>
        <p className="text-sm text-gray-500 uppercase">
          Taxes included. Shipping calculated at checkout.
        </p>

        {/* Color selector */}
        <div>
          <h4 className="mb-2 font-medium">Color</h4>
          <div className="flex gap-2">
            {currentProduct.colors.map((colorOption) => (
              <button
                key={colorOption.color}
                onClick={() => handleColorChange(colorOption.color)}
                className={`px-4 py-2 border ${
                  selectedColor === colorOption.color
                    ? "bg-[#6C4A2A] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {colorOption.color}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div>
          <h4 className="mb-2 font-medium">Size</h4>
          <div className="flex gap-2">
            {getAvailableSizes().map((sizeOption) => (
              <button
                key={sizeOption.size}
                onClick={() => setSelectedSize(sizeOption.size)}
                disabled={sizeOption.stock === 0}
                className={`px-4 py-2 border ${
                  selectedSize === sizeOption.size
                    ? "bg-[#6C4A2A] text-white"
                    : sizeOption.stock === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-black"
                }`}
              >
                {sizeOption.size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity selector */}
        <div>
          <h4 className="mb-2 font-medium">Quantity</h4>
          <div className="flex items-center border w-max">
            <button
              onClick={() => handleQuantityChange("dec")}
              className="px-4 py-2 text-xl"
            >
              –
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("inc")}
              className="px-4 py-2 text-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button onClick={handleAddToCart} className="w-full border py-2 font-medium hover:bg-gray-100 transition">
            ADD TO CART
          </button>
          <button 
            onClick={handleBuyNow}
            disabled={buyNowLoading}
            className="w-full bg-[#6C4A2A] text-white py-2 font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buyNowLoading ? "Processing..." : "BUY IT NOW"}
          </button>
        </div>

        {/* Footer actions */}
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          
          <span onClick={handleViewDetails}  className="cursor-pointer flex items-center gap-1">
            View full details <span className="text-xl">{">"}</span>
          </span>
        </div>
      </div>
   </div>
    </div>
  );
};

export default ProductDetails;