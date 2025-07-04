import React from "react";

const ProductFeatures = ({ formData, handleInputChange }) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Product Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Gender</label>
          <select
            name="features.gender"
            value={formData.features.gender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Fit</label>
          <select
            name="features.fit"
            value={formData.features.fit}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="">Select Fit</option>
            <option value="Regular">Regular</option>
            <option value="Slim">Slim</option>
            <option value="Loose">Loose</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Material</label>
          <input
            type="text"
            name="features.material"
            value={formData.features.material}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., Cotton, Polyester"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Neck Type</label>
          <select
            name="features.neck"
            value={formData.features.neck}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="">Select Neck Type</option>
            <option value="Round">Round</option>
            <option value="V-Neck">V-Neck</option>
            <option value="Collar">Collar</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Sleeves Type</label>
          <select
            name="features.sleevesType"
            value={formData.features.sleevesType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="">Select Sleeves</option>
            <option value="Full Sleeve">Full Sleeve</option>
            <option value="Half Sleeve">Half Sleeve</option>
            <option value="Sleeveless">Sleeveless</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Length</label>
          <select
            name="features.Length"
            value={formData.features.Length}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="">Select Length</option>
            <option value="Regular">Regular</option>
            <option value="Long">Long</option>
            <option value="Short">Short</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Occasion</label>
          <input
            type="text"
            name="features.occasion"
            value={formData.features.occasion}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., Casual, Formal"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Inner Lining</label>
          <input
            type="text"
            name="features.innerLining"
            value={formData.features.innerLining}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., None, Cotton"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;