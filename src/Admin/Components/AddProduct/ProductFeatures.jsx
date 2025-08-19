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
          <input
            type="text"
            name="features.fit"
            value={formData.features.fit}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., Regular, Slim"
          />
          
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
          <input
            type="text"
            name="features.neck"
            value={formData.features.neck}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., Round, V-Neck"
          />
          
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Sleeves Type</label>
          <input
            type="text"
            name="features.sleevesType"
            value={formData.features.sleevesType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., Full Sleeve, Half Sleeve"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Length</label>
          <input
            type="text"
            name="features.Length"
            value={formData.features.Length}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g., Regular, Long"
          /> 
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