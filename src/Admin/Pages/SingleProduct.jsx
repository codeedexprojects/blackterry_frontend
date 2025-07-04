import React, { useState, useEffect } from "react";
import { X, Star, Package, Calendar, MapPin, User, Tag, Truck, Gift, Eye, TrendingUp } from "lucide-react";
import { getProductById } from "../serveices/adminApi";

const ProductViewModal = ({ productId, isOpen, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (isOpen && productId) {
      fetchProduct();
    }
  }, [isOpen, productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductById(productId);
      if (response && response.data) {
        setProduct(response.data);
        setSelectedImage(0);
      }
    } catch (err) {
      setError("Failed to fetch product details");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return "/src/assets/product.jpg";
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/uploads/${imageName}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAverageRating = () => {
    return (4.0 + Math.random() * 1).toFixed(1);
  };

  const getTotalStock = () => {
    if (!product?.colors) return 0;
    return product.colors.reduce((total, color) => {
      return total + color.sizes.reduce((colorTotal, size) => colorTotal + size.stock, 0);
    }, 0);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50" };
    if (stock <= 10) return { text: "Low Stock", color: "text-yellow-600 bg-yellow-50" };
    return { text: "In Stock", color: "text-green-600 bg-green-50" };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-8">
              <p>{error}</p>
              <button 
                onClick={fetchProduct}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Images */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.images.length > 0 ? getImageUrl(product.images[selectedImage]) : "/src/assets/product.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/src/assets/product.jpg";
                    }}
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={getImageUrl(image)}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Product Details */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {product.product_Code}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {getAverageRating()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-900">₹{product.offerPrice}</span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-lg text-gray-500 line-through">₹{product.actualPrice}</span>
                        <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                          {product.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    You save ₹{product.actualPrice - product.offerPrice} on this product
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Stock:</span>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${getStockStatus(getTotalStock()).color}`}>
                      {getTotalStock()} units
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Orders:</span>
                    <span className="text-sm font-semibold text-gray-900">{product.orderCount}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {product.freeDelivery ? "Free Delivery" : "Standard Delivery"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {product.isOfferProduct ? "On Offer" : "Regular Price"}
                    </span>
                  </div>
                </div>

                {/* Product Features */}
                {product.features && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Product Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(product.features).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-sm font-medium text-gray-900">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors & Sizes */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Available Colors & Sizes</h4>
                  {product.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.color.toLowerCase() }}
                        ></div>
                        <span className="font-medium text-gray-900">{color.color}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {color.sizes.map((size, sizeIndex) => (
                          <div
                            key={sizeIndex}
                            className={`text-center p-2 rounded border ${
                              size.stock > 0 
                                ? 'border-gray-300 bg-white' 
                                : 'border-gray-200 bg-gray-50 text-gray-400'
                            }`}
                          >
                            <div className="text-sm font-medium">{size.size}</div>
                            <div className="text-xs text-gray-500">Stock: {size.stock}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Manufacturer Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Manufacturer Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium text-gray-900">{product.manufacturerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Brand:</span>
                      <span className="text-sm font-medium text-gray-900">{product.manufacturerBrand}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-sm text-gray-600">Address:</span>
                      <span className="text-sm font-medium text-gray-900">{product.manufacturerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {formatDate(product.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Updated: {formatDate(product.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;