import React from "react";
import ProductFeatures from "./ProductFeatures";
import ProductFlags from "./ProductFlags";

const EditProductInfoSection = ({
  formData,
  handleInputChange,
  handleActualPriceChange,
  handleDiscountChange
}) => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Product Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm md:text-base font-medium">
            Product Title*
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter Product title"
            className="w-full p-2 border rounded-md text-sm md:text-base"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm md:text-base font-medium">
            Product Code*
          </label>
          <input
            type="text"
            name="product_Code"
            value={formData.product_Code}
            onChange={handleInputChange}
            placeholder="Enter Product Code"
            className="w-full p-2 border rounded-md text-sm md:text-base"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm md:text-base font-medium">
              Actual Price*
            </label>
            <input
              type="number"
              name="actualPrice"
              value={formData.actualPrice}
              onChange={handleActualPriceChange}
              className="w-full p-2 border rounded-md text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm md:text-base font-medium">
              Discount (%)*
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleDiscountChange}
              className="w-full p-2 border rounded-md text-sm md:text-base"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm md:text-base font-medium">
            Offer Price*
          </label>
          <input
            type="number"
            name="offerPrice"
            value={formData.offerPrice}
            className="w-full p-2 border rounded-md text-sm md:text-base bg-gray-100"
            readOnly
          />
        </div>

        <div>
          <label className="block mb-2 text-sm md:text-base font-medium">
            Product Description
          </label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md h-32 text-sm md:text-base"
          />
        </div>

        {/* <ProductFeatures
          formData={formData}
          handleInputChange={handleInputChange}
        /> */}

        <ProductFlags 
          formData={formData}
          handleInputChange={handleInputChange}
        />
        
      </div>
    </div>
  );
};

export default EditProductInfoSection;