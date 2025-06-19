import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import HeaderAdmin from "../Components/HeaderAdmin";
import AdminLayout from "../Components/AdminLayout";

function EditProduct() {
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
      <h1 className="text-sm font-small mb-6">Edit product</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Product Information</h2>

          <label className="block mb-2 font-medium">Product title*</label>
          <input
            type="text"
            placeholder="Enter Product title"
            className="w-full p-2 border rounded-md mb-4"
          />

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">
                Product Category*
              </label>
              <select className="w-full p-2 border rounded-md">
                <option>Kurti</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium">Sub Category*</label>
              <select className="w-full p-2 border rounded-md">
                <option>Ethnic Wear</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Actual Price*</label>
              <input
                type="text"
                value="₹1000"
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium">Discount (%)*</label>
              <input
                type="text"
                value="50%"
                className="w-full p-2 border rounded-md"
                readOnly
              />
            </div>
          </div>

          <label className="block mb-2 font-medium">Offer Price*</label>
          <input
            type="text"
            value="₹500"
            className="w-full p-2 border rounded-md mb-4"
            readOnly
          />

          <label className="block mb-2 font-medium">Product Description</label>
          <textarea
            className="w-full p-2 border rounded-md h-32"
            defaultValue="For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words."
          />
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="mb-4 border-2 border-dashed border-brown-400 p-4 rounded-md flex flex-col items-center justify-center">
            <p className="text-brown-700 mb-2">Browse Files to upload</p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
            >
              Choose Files
            </label>
          </div>

          <ul className="mb-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded mb-1"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                    📄
                  </div>
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-brown-500"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>

          <label className="block mb-2 font-medium">Manufacturer Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter Manufacturer Name"
          />

          <label className="block mb-2 font-medium">Manufacturer Brand</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Enter Manufacturer Brand"
          />

          <div className="mb-4">
            <label className="block mb-2 font-medium">Colour</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="p-2 border rounded-md flex-1"
                placeholder="#HEX"
              />
              <button
                onClick={handleAddColor}
                className="px-3 py-2 bg-gray-200 rounded-md text-sm font-medium"
              >
                + ADD COLOUR
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {["#00C897", "#FFD500", "#00A1FF", "#FF4D6D"].map((c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Size</label>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "2XL"].map((size, i) => (
                <div
                  key={i}
                  className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-200"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-700">
            SUBMIT PRODUCT
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EditProduct;
