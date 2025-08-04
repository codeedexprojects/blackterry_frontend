import React, { useState, useEffect } from "react";
import { Plus, MoreHorizontal, Star, Edit, Trash2, Eye, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import { getProducts, deleteProduct } from "../serveices/adminApi";
import ProductViewModal from "./SingleProduct";
import ConfirmationModal from "../Components/DeleteConfirmation";

function Product() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    stockStatus: "all", // all, in-stock, low-stock, out-of-stock
    priceRange: "all", // all, under-1000, 1000-5000, above-5000
    sortBy: "newest", // newest, oldest, price-low, price-high, name-asc, name-desc
    hasDiscount: "all" // all, with-discount, without-discount
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [products, searchTerm, filters]);

  useEffect(() => {
    applyPagination();
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, filters]);

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

  const applyFiltersAndSearch = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_Code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply stock status filter
    if (filters.stockStatus !== "all") {
      filtered = filtered.filter(product => {
        switch (filters.stockStatus) {
          case "in-stock":
            return product.totalStock > 10;
          case "low-stock":
            return product.totalStock > 0 && product.totalStock <= 10;
          case "out-of-stock":
            return product.totalStock === 0;
          default:
            return true;
        }
      });
    }

    // Apply price range filter
    if (filters.priceRange !== "all") {
      filtered = filtered.filter(product => {
        const price = product.discount > 0 ? product.offerPrice : product.actualPrice;
        switch (filters.priceRange) {
          case "under-1000":
            return price < 1000;
          case "1000-5000":
            return price >= 1000 && price <= 5000;
          case "above-5000":
            return price > 5000;
          default:
            return true;
        }
      });
    }

    // Apply discount filter
    if (filters.hasDiscount !== "all") {
      filtered = filtered.filter(product => {
        switch (filters.hasDiscount) {
          case "with-discount":
            return product.discount > 0;
          case "without-discount":
            return product.discount === 0;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "price-low":
          const priceA = a.discount > 0 ? a.offerPrice : a.actualPrice;
          const priceB = b.discount > 0 ? b.offerPrice : b.actualPrice;
          return priceA - priceB;
        case "price-high":
          const priceA2 = a.discount > 0 ? a.offerPrice : a.actualPrice;
          const priceB2 = b.discount > 0 ? b.offerPrice : b.actualPrice;
          return priceB2 - priceA2;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredProducts(filtered);
  };

  const applyPagination = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  };

  const getTotalPages = () => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      stockStatus: "all",
      priceRange: "all",
      sortBy: "newest",
      hasDiscount: "all"
    });
    setSearchTerm("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.stockStatus !== "all") count++;
    if (filters.priceRange !== "all") count++;
    if (filters.hasDiscount !== "all") count++;
    if (searchTerm.trim()) count++;
    return count;
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  const getImageUrl = (imageName) => {
    if (!imageName) return "/src/assets/product.jpg";
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/uploads/${imageName}`;
  };

  const getAverageRating = (product) => {
    return (4.0 + Math.random() * 1).toFixed(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleEdit = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
    setOpenDropdown(null);
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
    setOpenDropdown(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setDeleteLoading(productToDelete);
      const response = await deleteProduct(productToDelete);

      if (response && response.status === 200) {
        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== productToDelete)
        );
        console.log("Product deleted successfully:", productToDelete);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(null);
      closeDeleteModal();
    }
  };

  const handleView = (productId) => {
    setSelectedProductId(productId);
    setViewModalOpen(true);
    setOpenDropdown(null);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedProductId(null);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-4">
        <div className="p-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              Products ({filteredProducts.length})
            </h1>
            <Link
              to="/admin/add-product"
              style={{ backgroundColor: "#50311D" }}
              className="flex items-center gap-2 no-underline   text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              ADD PRODUCT
            </Link>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${showFilters ? 'bg-blue-50 border-blue-300' : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Stock Status Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Status
                    </label>
                    <select
                      value={filters.stockStatus}
                      onChange={(e) => handleFilterChange('stockStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Stock Levels</option>
                      <option value="in-stock">In Stock (10+)</option>
                      <option value="low-stock">Low Stock (1-10)</option>
                      <option value="out-of-stock">Out of Stock (0)</option>
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Prices</option>
                      <option value="under-1000">Under ₹1,000</option>
                      <option value="1000-5000">₹1,000 - ₹5,000</option>
                      <option value="above-5000">Above ₹5,000</option>
                    </select>
                  </div>

                  {/* Discount Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount
                    </label>
                    <select
                      value={filters.hasDiscount}
                      onChange={(e) => handleFilterChange('hasDiscount', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Products</option>
                      <option value="with-discount">With Discount</option>
                      <option value="without-discount">Without Discount</option>
                    </select>
                  </div>

                  {/* Sort By Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {getActiveFiltersCount() > 0 && (
                  <div className="flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              {products.length === 0 ? (
                <>
                  <p className="text-gray-500 text-lg mb-4">No products found</p>
                  <Link
                    to="/admin/add-product"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors no-underline"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Product
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-lg mb-4">
                    No products match your search criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                    {filteredProducts.map((product, index) => (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                product.images?.length > 0
                                  ? `https://blackterry.in/uploads/${product.images[0]}`
                                  : "/src/assets/product.jpg"
                              }
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded-lg border"
                              onError={(e) => {
                                e.target.src = "/src/assets/product.jpg"; // fallback if image fails
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
                          <span className={`text-sm font-semibold ${product.totalStock > 10 ? 'text-green-600' :
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
                            disabled={deleteLoading === product._id}
                          >
                            {deleteLoading === product._id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            ) : (
                              <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            )}
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
                                onClick={() => openDeleteModal(product._id)}
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

              <div className="lg:hidden">
                {filteredProducts.map((product, index) => (
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
                          disabled={deleteLoading === product._id}
                        >
                          {deleteLoading === product._id ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                          ) : (
                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                          )}
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
                              onClick={() => openDeleteModal(product._id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Stock:</span>
                        <span className={`ml-2 font-semibold ${product.totalStock > 10 ? 'text-green-600' :
                            product.totalStock > 0 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                          {product.totalStock}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Orders:</span>
                        <span className="ml-2 font-semibold text-gray-700">
                          {product.orderCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <div className="ml-2 inline-flex flex-col">
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
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <span className="ml-2 font-medium text-gray-600">
                          {formatDate(product.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {viewModalOpen && selectedProductId && (
        <ProductViewModal
          productId={selectedProductId}
          isOpen={viewModalOpen}
          onClose={closeViewModal}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          confirmText={deleteLoading ? "Deleting..." : "Delete"}
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default Product;