import React, { useState } from "react";
import { Plus, MoreHorizontal, Star, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";
import image1 from "/src/assets/product.jpg";
import AdminLayout from "../Components/AdminLayout";

function Product() {
  const [viewMode, setViewMode] = useState("list");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    kurti: true,
    bottom: false,
    kurtiSet: false,
    maternityWear: false,
    nightWear: false,
    runningMaterial: false,
    churidarMaterial: false,
    offerZone: false,
  });

  const products = Array(8)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      name: "Stylish Crop Top",
      image: image1,
      stock: 12,
      rate: 4.9,
      price: "₹500",
      orders: 48,
      publish: "15-Nov-2024",
    }));

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-aut mt-4">
        <div className="flex flex-col lg:flex-row">
          {/* Filter Section */}
          <div className="lg:w-64 bg-white border-r border-gray-200 p-4">
            {/* View Toggle */}
            <div className="mb-6 space-y-2">
              <button
                onClick={() => setViewMode("list")}
                className={`w-full flex items-center gap-2 py-2 mb-3 px-3 rounded-md text-sm font-medium transition-colors border ${
                  viewMode === "list"
                    ? "bg-orange-500/20 text-gray-900 border-orange-400"
                    : "text-gray-600 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
                List View
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`w-full flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors border ${
                  viewMode === "grid"
                    ? "bg-orange-500/20 text-gray-900 border-orange-400"
                    : "text-gray-600 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Grid View
              </button>
            </div>

            {/* Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { key: "kurti", label: "Kurti" },
                  { key: "bottom", label: "Bottom" },
                  { key: "kurtiSet", label: "Kurti Set" },
                  { key: "maternityWear", label: "Maternity Wear" },
                  { key: "nightWear", label: "Night Wear" },
                  { key: "runningMaterial", label: "Running Material" },
                  { key: "churidarMaterial", label: "Churidar Material" },
                  { key: "offerZone", label: "Offer Zone" },
                ].map((filter) => (
                  <label
                    key={filter.key}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={filters[filter.key]}
                      onChange={() => handleFilterChange(filter.key)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    {filter.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Products Section */}
          <div className="flex-1 p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
                Products
              </h1>
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/add-product"
                className="flex items-center gap-2 no-underline bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                ADD PRODUCT
              </Link>
            </div>

            {/* Products Display */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {/* Dropdown Button */}
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base font-semibold text-gray-900">
                            {product.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-semibold text-gray-700">
                              {product.rate}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-gray-600 truncate">
                          Trendy, comfy crop to...
                        </p>
                        <p className="text-[10px] text-gray-600 mt-1">
                          Published {product.publish}
                        </p>
                        <div className="flex justify-between mt-2 text-xs text-gray-700">
                          <span>Stocks {product.stock}</span>
                          <span>Orders {product.orders}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop Table (List View) */}
              {viewMode === "list" && (
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-sky-500/20 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                          Product Name
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
                          Publish
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((product, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                              <span className="text-sm font-semibold text-gray-900">
                                {product.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                            {product.stock}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-semibold text-gray-700">
                                {product.rate}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                            {product.price}
                          </td>
                          <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                            {product.orders}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-600">
                            {product.publish}
                          </td>
                          <td className="py-4 px-6 relative">
                            <button
                              onClick={() => toggleDropdown(index)}
                              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                            >
                              <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mobile Cards (List View on Mobile) */}
              {viewMode === "list" && (
                <div className="lg:hidden">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="p-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 mb-1">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-semibold text-gray-700">
                                {product.rate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500 font-medium">
                            Stock:{" "}
                          </span>
                          <span className="text-gray-700 font-semibold">
                            {product.stock}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">
                            Price:{" "}
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {product.price}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">
                            Orders:{" "}
                          </span>
                          <span className="text-gray-700 font-semibold">
                            {product.orders}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">
                            Publish:{" "}
                          </span>
                          <span className="text-gray-600 font-medium">
                            {product.publish}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown Menu */}
              {/* {openDropdown !== null && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenDropdown(null)}
                      ></div>
                      <div className="absolute bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[120px]">
                        <button className="w-full text-left px-4 py-3 text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors border-b border-gray-100">
                          Edit
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-gray-50 transition-colors">
                          Delete
                        </button>
                      </div>
                    </>
                  )} */}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Product;
