import React from "react";
import FileUploader from "./FileUpload";
import ColorStockManager from "./ColorStock";

const MediaDetailsSection = ({
  formData,
  handleInputChange,
  files,
  handleFileChange,
  removeFile,
  colors,
  currentColor,
  setCurrentColor,
  handleAddColor,
  handleStockChange,
  removeColor,
  calculateTotalStock
}) => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
      <div className="space-y-4">
        <FileUploader
          files={files}
          handleFileChange={handleFileChange}
          removeFile={removeFile}
        />

        <div>
          <label className="block mb-2 text-sm md:text-base font-medium">
            Manufacturer Name
          </label>
          <input
            type="text"
            name="manufacturerName"
            value={formData.manufacturerName}
            onChange={handleInputChange}
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
            name="manufacturerBrand"
            value={formData.manufacturerBrand}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm md:text-base"
            placeholder="Enter Manufacturer Brand"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm md:text-base font-medium">
            Manufacturer Address
          </label>
          <input
            type="text"
            name="manufacturerAddress"
            value={formData.manufacturerAddress}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm md:text-base"
            placeholder="Enter Manufacturer Address"
          />
        </div>

        <ColorStockManager
          colors={colors}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          handleAddColor={handleAddColor}
          handleStockChange={handleStockChange}
          removeColor={removeColor}
          calculateTotalStock={calculateTotalStock}
        />

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md text-base md:text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          SUBMIT PRODUCT
        </button>
      </div>
    </div>
  );
};

export default MediaDetailsSection;