import React, { useState } from "react";
import AdminLayout from "../Components/AdminLayout";

function AddProduct() {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [files, setFiles] = useState([]);

  const handleAddColor = () => {
    if (color && !colors.includes(color)) {
      setColors([...colors, color]);
      setColor("");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Create product</h1>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Product Information */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Product title*
                </label>
                <input
                  type="text"
                  placeholder="Enter Product title"
                  className="w-full p-2 border rounded-md text-sm md:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm md:text-base font-medium">
                    Product Category*
                  </label>
                  <select className="w-full p-2 border rounded-md text-sm md:text-base">
                    <option>Kurti</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm md:text-base font-medium">
                    Sub Category*
                  </label>
                  <select className="w-full p-2 border rounded-md text-sm md:text-base">
                    <option>Ethnic Wear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm md:text-base font-medium">
                    Actual Price*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm md:text-base"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm md:text-base font-medium">
                    Discount (%)*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm md:text-base"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Offer Price*
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm md:text-base"
                  readOnly
                />
              </div>

              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Product Description
                </label>
                <textarea className="w-full p-2 border rounded-md h-32 text-sm md:text-base" />
              </div>
            </div>
          </div>

          {/* Right Panel - Media & Details */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center justify-center">
                <p className="text-gray-700 mb-2 text-sm md:text-base">
                  Browse Files to upload
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors"
                >
                  Choose Files
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="max-h-40 overflow-y-auto">
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                            📄
                          </div>
                          <span className="truncate max-w-[180px] md:max-w-xs">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ✖
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Manufacturer Info */}
              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Manufacturer Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm md:text-base"
                  placeholder="Enter Manufacturer Name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Manufacturer Brand
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm md:text-base"
                  placeholder="Enter Manufacturer Brand"
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Colour
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="p-2 border rounded-md w-full sm:flex-1 text-sm md:text-base"
                    placeholder="#HEX"
                  />
                  <button
                    onClick={handleAddColor}
                    className="w-full sm:w-auto px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm md:text-base font-medium transition-colors"
                  >
                    + ADD COLOUR
                  </button>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {["#00C897", "#FFD500", "#00A1FF", "#FF4D6D"].map((c, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block mb-2 text-sm md:text-base font-medium">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "2XL"].map((size, i) => (
                    <button
                      key={i}
                      type="button"
                      className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm md:text-base font-medium hover:bg-gray-200 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-blue-600 text-white py-2 rounded-md text-base md:text-lg font-medium hover:bg-blue-700 transition-colors">
                SUBMIT PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
