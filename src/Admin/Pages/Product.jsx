import React, { useState, useEffect } from "react";
import { Plus, MoreHorizontal, Star, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import { getProducts } from "../serveices/adminApi";

function Product() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      if (response && response.data) {
        setProducts(response.data);
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    
    if (openDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  // Get image URL (assuming images are stored with base URL)
  const getImageUrl = (imageName) => {
    if (!imageName) return "/src/assets/product.jpg"; // fallback image
    // Adjust this based on your image storage setup
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/uploads/${imageName}`;
  };

  // Calculate average rating (placeholder - you might want to add this to your API)
  const getAverageRating = (product) => {
    // This is a placeholder. You might want to add rating functionality to your API
    return (4.0 + Math.random() * 1).toFixed(1);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle dropdown actions
  const handleEdit = (productId) => {
    // Navigate to edit page or open edit modal
    console.log("Edit product:", productId);
    setOpenDropdown(null);
  };

  const handleDelete = (productId) => {
    // Show confirmation and delete product
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product:", productId);
      // Add delete API call here
    }
    setOpenDropdown(null);
  };

  const handleView = (productId) => {
    // Navigate to product detail page
    console.log("View product:", productId);
    setOpenDropdown(null);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto mt-4">
          <div className="p-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto mt-4">
          <div className="p-4">
            <div className="text-center text-red-600 p-8">
              <p>{error}</p>
              <button 
                onClick={fetchProducts}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto mt-4">
        <div className="p-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Products ({products.length})
            </h1>
            <Link
              to="/admin/add-product"
              className="flex items-center gap-2 no-underline bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              ADD PRODUCT
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">No products found</p>
              <Link
                to="/admin/add-product"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors no-underline"
              >
                <Plus className="w-4 h-4" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            /* Products Table */
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sky-500/20 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Product Name
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Code
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Stock
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Rate
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Orders
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Created
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product, index) => (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images.length > 0 ? getImageUrl(product.images[0]) : "/src/assets/product.jpg"}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded-lg border"
                              onError={(e) => {
                                e.target.src = "/src/assets/product.jpg";
                              }}
                            />
                            <div>
                              <span className="text-sm font-semibold text-gray-900 block">
                                {product.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                {product.colors.length} color{product.colors.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-700">
                          {product.product_Code}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-sm font-semibold ${
                            product.totalStock > 10 ? 'text-green-600' : 
                            product.totalStock > 0 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {product.totalStock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-gray-700">
                              {getAverageRating(product)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            {product.discount > 0 ? (
                              <>
                                <span className="text-sm font-semibold text-gray-900">
                                  ₹{product.offerPrice}
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                  ₹{product.actualPrice}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-semibold text-gray-900">
                                ₹{product.actualPrice}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                          {product.orderCount}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-600">
                          {formatDate(product.createdAt)}
                        </td>
                        <td className="py-4 px-6 relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(index);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                          </button>
                          {openDropdown === index && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <button
                                onClick={() => handleView(product._id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={() => handleEdit(product._id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="p-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images.length > 0 ? getImageUrl(product.images[0]) : "/src/assets/product.jpg"}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg border"
                          onError={(e) => {
                            e.target.src = "/src/assets/product.jpg";
                          }}
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {product.title}
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-gray-700">
                              {getAverageRating(product)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Code: {product.product_Code}
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(index);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>
                        {openDropdown === index && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <button
                              onClick={() => handleView(product._id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 font-medium">Stock: </span>
                        <span className={`font-semibold ${
                          product.totalStock > 10 ? 'text-green-600' : 
                          product.totalStock > 0 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {product.totalStock}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-medium">Price: </span>
                        {product.discount > 0 ? (
                          <span className="text-gray-900 font-semibold">
                            ₹{product.offerPrice}
                          </span>
                        ) : (
                          <span className="text-gray-900 font-semibold">
                            ₹{product.actualPrice}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-500 font-medium">Orders: </span>
                        <span className="text-gray-700 font-semibold">
                          {product.orderCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-medium">Created: </span>
                        <span className="text-gray-600 font-medium">
                          {formatDate(product.createdAt)}
                        </span>
                      </div>
                    </div>
                    {product.colors.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Colors: </span>
                        <span className="text-xs text-gray-700">
                          {product.colors.map(c => c.color).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Product;