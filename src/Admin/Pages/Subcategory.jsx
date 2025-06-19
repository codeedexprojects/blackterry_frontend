import React, { useState } from "react";
import {
  Search,
  Upload,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import HeaderAdmin from "../Components/HeaderAdmin";
import AdminLayout from "../Components/AdminLayout";

function Subcategory() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Bottom",
    image: null,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const subcategories = [
    { id: 1, name: "kurti", category: "Kurti", status: "Disabled" },
    { id: 2, name: "Kurti Set", category: "Kurti", status: "Enabled" },
    { id: 3, name: "Ethnic wear", category: "Kurti", status: "Enabled" },
    { id: 4, name: "Leggings", category: "Bottom", status: "Enabled" },
    { id: 5, name: "Palazzo", category: "Bottom", status: "Enabled" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const getStatusColor = (status) => {
    return status === "Enabled" ? "text-green-600" : "text-red-500";
  };

  const filteredSubcategories = subcategories.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-aut  mt-5">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sub Categories
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Create Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "500px",
                }}
              >
                Create Subcategories
              </h2>

              <form className="space-y-8 mt-4">
                {/* Sub Category Title */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Sub Category Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Palazzo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category*
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all bg-white"
                    >
                      <option value="Bottom">Bottom</option>
                      <option value="Kurti">Kurti</option>
                      <option value="Top">Top</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image*
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Drop your image here, or browse
                    </p>
                    <p className="text-xs text-gray-400">
                      Supports: JPG, JPEG, PNG
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-block mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel - Table */}
          <div className="lg:col-span-2">
            <div className="p-6 border-gray-200 ">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search By Coupon code & name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl">
              <table className="w-full">
                <thead className=" bg-blue-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Subcategory
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubcategories.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 ">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium p-2">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Page</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Subcategory;
