import React, { useState } from "react";
import { Search, Upload, Edit2, Trash2 } from "lucide-react";
import AdminLayout from "../Components/AdminLayout";

function Advertisement() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { title: "Kurti", items: ["Kurti", "Kurti Set", "Ethnic Wear", "Dress"] },
    {
      title: "Kurti Set",
      items: ["Top & Bottom Set", "Top , Bottom Dupatta Set"],
    },
    { title: "Bottom", items: ["Pants", "Leggings", "Palazzo", "Jeans"] },
    {
      title: "Maternity Wear",
      items: ["Pre Maternity", "Post Maternity", "Maternity Nighty"],
    },
    {
      title: "Night wear",
      items: ["Nighty", "Short Nighty", "Top & Bottom", "Kaftan"],
    },
    {
      title: "Running Material",
      items: ["Kurti", "Kurti Set", "Ethnic Wear", "Dress"],
    },
    { title: "Churidar Materials", items: ["Kurti"] },
    { title: "Offer Zone", items: ["Kurti"] },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Categories
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                Create Subcategories
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter category title"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Upload className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Browse Files to upload
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    placeholder="Enter description"
                  />
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-md">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="relative max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCategories.map((category, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {category.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-600 p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-1 mb-3">
                      {category.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {item}
                        </p>
                      ))}
                    </div>

                    {/* Read More */}
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center">
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Advertisement;
