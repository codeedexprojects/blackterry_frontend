import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaRegHeart, FaMinus, FaPlus, FaShoppingCart, FaTruck, FaRegCreditCard, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Footer from '/src/Components/Footer'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { addToCart, getProductById, buyNow, addToWishlist, getWishlist } from "../services/allApi";
import Header from "/src/Components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecommendedProducts from "../Components/ProductDetails/RecomendedProducts";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyNowLoading, setBuyNowLoading] = useState(false);

  // Wishlist states
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [checkingWishlist, setCheckingWishlist] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  const IMG_BASE_URL = "https://blackterry.in/uploads";

  const [accordionState, setAccordionState] = useState({
    specifications: false,
    shipping: false,
    manufacturer: false
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        const productData = response.data;

        setProduct(productData);

        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0].color);

          if (productData.colors[0].sizes && productData.colors[0].sizes.length > 0) {
            setSelectedSize(productData.colors[0].sizes[0].size);
          }
        }

        if (productData.images && productData.images.length > 0) {
          setMainImage(productData.images[0]);
        }

        // Check wishlist status after product is loaded
        checkWishlistStatus();

      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
          item => item.productId._id === id
        );
        setIsInWishlist(isProductInWishlist);
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      // Don't show toast for wishlist check error to avoid spam
    } finally {
      setCheckingWishlist(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (wishlistLoading || checkingWishlist) return;

    setWishlistLoading(true);

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

        toast.success(response.data.message || message);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const getAvailableSizes = () => {
    if (!product || !selectedColor) return [];

    const colorData = product.colors.find(c => c.color === selectedColor);
    return colorData ? colorData.sizes : [];
  };

  const getStock = () => {
    if (!product || !selectedColor || !selectedSize) return 0;

    const colorData = product.colors.find(c => c.color === selectedColor);
    if (!colorData) return 0;

    const sizeData = colorData.sizes.find(s => s.size === selectedSize);
    return sizeData ? sizeData.stock : 0;
  };

  const getDiscountedPrice = () => {
    if (!product) return 0;
    return product.actualPrice - (product.actualPrice * product.discount / 100);
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    const stock = getStock();

    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);

    const colorData = product.colors.find(c => c.color === color);
    if (colorData && colorData.sizes.length > 0) {
      setSelectedSize(colorData.sizes[0].size);
    }

    setQuantity(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

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
        productId: product._id,
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
        productId: product._id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
      };

      const response = await buyNow(reqBody);

      if (response && response.status === 201) {
        const checkoutId = response.data.checkoutId;

        // Navigate to checkout page with checkoutId
        navigate("/checkout", {
          state: {
            checkoutId: checkoutId,
          },
        });
      } else {
        console.error('Buy now failed:', response);
        toast.error("Failed to process purchase");
      }
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error(error.response?.data?.message || "Failed to process purchase");
    } finally {
      setBuyNowLoading(false);
    }
  };

  // Toggle accordion sections
  const toggleAccordion = (section) => {
    setAccordionState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-4">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show error state
  if (error || !product) {
    return (
      <>
        <Header />
        <div className="container py-4">
          <div className="text-center">
            <h3 className="text-danger">Error</h3>
            <p>{error || 'Product not found'}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const currentStock = getStock();
  const discountedPrice = getDiscountedPrice();
  const availableSizes = getAvailableSizes();

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container py-4">

        <div className="row gx-4">
          {/* Left side - Product Images */}
          <div className="col-md-1 d-none d-md-block">
            <div className="d-flex flex-column gap-3">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="border rounded overflow-hidden"
                    style={{ cursor: "pointer", aspectRatio: "1/1" }}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={`${IMG_BASE_URL}/${img}`}
                      alt={`Product view ${idx + 1}`}
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))
              ) : (
                <div
                  className="border rounded d-flex align-items-center justify-content-center"
                  style={{ aspectRatio: "1/1", minHeight: "80px" }}
                >
                  <span className="text-muted small">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Product Image */}
          <div className="col-md-5">
            <div className="position-sticky" style={{ top: "20px" }}>
              <div className="border rounded overflow-hidden">
                {mainImage || (product.images && product.images.length > 0) ? (
                  <img
                    src={`${IMG_BASE_URL}/${mainImage || product.images[0]}`}
                    alt={product.title}
                    className="img-fluid w-100"
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ minHeight: "400px" }}
                  >
                    <span className="text-muted">No Image Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Mobile View - Horizontal Image Thumbnails */}
          <div className="d-md-none mb-3">
            <div className="d-flex overflow-x-auto gap-2 py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="border rounded flex-shrink-0"
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      border: mainImage === img ? "2px solid #50311D" : "1px solid #dee2e6"
                    }}
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={`${IMG_BASE_URL}/${img}`}
                      alt={`Product view ${idx + 1}`}
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))
              ) : (
                <div className="text-muted small">No Images Available</div>
              )}
            </div>
          </div>


          {/* Right side - Product Details */}
          <div className="col-md-6">
            <div className="product-details">
              <h1 className="fw-bold mb-3 fs-3">
                {product.title}
              </h1>

              <div className="mb-2">
                <span className="badge bg-secondary">Code: {product.product_Code}</span>
              </div>

              <div className="price-section mb-4">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <span className="current-price fw-bold fs-2 text-dark">
                    ₹{discountedPrice.toFixed(0)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="original-price text-decoration-line-through text-muted fs-5">
                        ₹{product.actualPrice}
                      </span>
                      <span className="badge bg-success fs-6 d-inline-flex align-items-center gap-1">
                        <IoMdInformationCircleOutline />
                        Save {product.discount}% right now
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div className="color-section mb-4">
                <h5 className="fw-bold mb-3">Colors</h5>
                <div className="d-flex gap-3 flex-wrap">
                  {product.colors.map((colorData) => (
                    <div
                      key={colorData.color}
                      className={`position-relative ${selectedColor === colorData.color
                        ? "border border-3 border-dark rounded p-2"
                        : "border rounded p-2"
                        }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleColorChange(colorData.color)}
                    >
                      <span className="small fw-bold">{colorData.color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="size-section mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Select Size</h5>
                  <span className="small text-muted">
                    Stock: {currentStock} items
                  </span>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {availableSizes.map((sizeData) => (
                    <button
                      key={sizeData.size}
                      className={`btn ${selectedSize === sizeData.size
                        ? "btn-dark"
                        : "btn-outline-secondary"
                        } d-flex justify-content-center align-items-center`}
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}
                      onClick={() => handleSizeChange(sizeData.size)}
                      disabled={sizeData.stock === 0}
                    >
                      {sizeData.size}
                      {sizeData.stock === 0 && (
                        <span className="position-absolute top-50 start-50 translate-middle">
                          <small className="text-danger">×</small>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="quantity-section mb-4">
                <h5 className="fw-bold mb-3">Quantity</h5>
                <div className="d-flex align-items-center border rounded" style={{ width: "140px" }}>
                  <button
                    className="btn btn-light border-0 d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <FaMinus size={12} />
                  </button>
                  <div className="flex-grow-1 text-center py-2 fw-bold">
                    {quantity}
                  </div>
                  <button
                    className="btn btn-light border-0 d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= currentStock}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                <small className="text-muted">
                  {currentStock > 0 ? `${currentStock} items available` : 'Out of stock'}
                </small>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mb-3">
                <div className="d-flex gap-3 mb-3">
                  <button
                    className="btn text-white py-3 px-4 flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: "#50311D" }}
                    disabled={currentStock === 0}
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart />
                    {currentStock > 0 ? 'Add to cart' : 'Out of stock'}
                  </button>
                  <button
                    className="btn btn-outline-dark py-3 px-3 d-flex align-items-center justify-content-center"
                    onClick={handleAddToWishlist}
                    disabled={wishlistLoading || checkingWishlist}
                    title={
                      checkingWishlist
                        ? "Checking wishlist..."
                        : isInWishlist
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                    }
                  >
                    {wishlistLoading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : checkingWishlist ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : isInWishlist ? (
                      <FaHeart style={{ color: "#50311D" }} />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                <button
                  className="btn text-white w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: "#50311D" }}
                  disabled={currentStock === 0 || buyNowLoading}
                  onClick={handleBuyNow}
                >
                  {buyNowLoading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaRegCreditCard />
                      {currentStock > 0 ? 'Buy it now' : 'Out of stock'}
                    </>
                  )}
                </button>
              </div>

              {/* Product Description */}
              <div className="product-description mb-4 p-3 bg-light rounded">
                <p className="text-muted mb-0 small">
                  {product.description}
                </p>
              </div>

              {/* Accordion Sections - React-based */}
              <div className="mb-4">
                {/* Product Specifications */}
                <div className="border-bottom">
                  <button
                    className="btn btn-link w-100 text-start fw-bold py-3 text-decoration-none text-dark d-flex justify-content-between align-items-center"
                    onClick={() => toggleAccordion('specifications')}
                  >
                    Product Specifications
                    {accordionState.specifications ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {accordionState.specifications && (
                    <div className="pb-3 px-3">
                      <ul className="list-unstyled mb-0">
                        <li><strong>Material:</strong> {product.features.material}</li>
                        <li><strong>Fit:</strong> {product.features.fit}</li>
                        <li><strong>Sleeve:</strong> {product.features.sleevesType}</li>
                        <li><strong>Neckline:</strong> {product.features.neck}</li>
                        <li><strong>Length:</strong> {product.features.Length}</li>
                        <li><strong>Occasion:</strong> {product.features.occasion}</li>
                        <li><strong>Gender:</strong> {product.features.gender}</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Shipping & Return */}
                <div className="border-bottom">
                  <button
                    className="btn btn-link w-100 text-start fw-bold py-3 text-decoration-none text-dark d-flex justify-content-between align-items-center"
                    onClick={() => toggleAccordion('shipping')}
                  >
                    Shipping & Return
                    {accordionState.shipping ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {accordionState.shipping && (
                    <div className="pb-3 px-3">
                      <ul className="list-unstyled mb-0">
                        <li>✓ {product.freeDelivery ? 'Free shipping available' : 'Standard shipping charges apply'}</li>
                        <li>✓ 30-day return policy</li>
                        <li>✓ Easy returns and exchanges</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Manufacturer Details */}
                <div className="border-bottom">
                  <button
                    className="btn btn-link w-100 text-start fw-bold py-3 text-decoration-none text-dark d-flex justify-content-between align-items-center"
                    onClick={() => toggleAccordion('manufacturer')}
                  >
                    Manufacturer Details
                    {accordionState.manufacturer ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {accordionState.manufacturer && (
                    <div className="pb-3 px-3">
                      <ul className="list-unstyled mb-0">
                        <li><strong>Brand:</strong> {product.manufacturerBrand}</li>
                        <li><strong>Manufacturer:</strong> {product.manufacturerName}</li>
                        <li><strong>Address:</strong> {product.manufacturerAddress}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                {product.freeDelivery && (
                  <div className="d-flex align-items-center gap-2 mb-2 small text-muted">
                    <FaTruck />
                    <span>Free shipping available</span>
                  </div>
                )}

                <div className="alert alert-light border-0 p-2">
                  <small className="text-muted d-flex align-items-start gap-2">
                    <IoMdInformationCircleOutline className="mt-1 flex-shrink-0" />
                    <span>
                      <strong>Stock Status:</strong> {product.totalStock} total items in stock.
                      {product.isLatestProduct && ' This is a latest product!'}
                      {product.isOfferProduct && ' Special offer available!'}
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <RecommendedProducts />
      </div>
      <Footer />
    </>
  );
}

export default Details;