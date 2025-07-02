import React from "react";

const ProductFlags = ({ formData, handleInputChange }) => {
    return (

        <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Product Settings</h3>
            <div className="space-y-3">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="isLatestProduct"
                        checked={formData.isLatestProduct}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm">Latest Product</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="isOfferProduct"
                        checked={formData.isOfferProduct}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm">Offer Product</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="isFeaturedProduct"
                        checked={formData.isFeaturedProduct}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm">Featured Product</span>
                </label>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="freeDelivery"
                        checked={formData.freeDelivery}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <span className="text-sm">Free Delivery</span>
                </label>
            </div>
        </div>
           
            
  );
};

export default ProductFlags;