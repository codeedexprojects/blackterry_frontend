import React, { useState } from "react";
import ProductInfoSection from "../Components/AddProduct/ProductInfo";
import MediaDetailsSection from "../Components/AddProduct/MediaDetails";
import { addProduct } from "../serveices/adminApi";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    product_Code: "",
    actualPrice: "",
    discount: "",
    offerPrice: "",
    description: "",
    manufacturerName: "",
    manufacturerBrand: "",
    manufacturerAddress: "",
    isLatestProduct: false,
    isOfferProduct: false,
    isFeaturedProduct: false,
    freeDelivery: false,
    features: {
      gender: "",
      fit: "",
      material: "",
      neck: "",
      sleevesType: "",
      Length: "",
      occasion: "",
      innerLining: ""
    }
  });

  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [files, setFiles] = useState([]);

  // Handle form input changes

  // For redirection after successful submit
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('features.')) {
      const featureKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Calculate offer price when actual price or discount changes
  const calculateOfferPrice = (actualPrice, discount) => {
    if (actualPrice && discount) {
      const discountAmount = (actualPrice * discount) / 100;
      return actualPrice - discountAmount;
    }
    return "";
  };

  // Handle actual price change
  const handleActualPriceChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      actualPrice: value,
      offerPrice: calculateOfferPrice(parseFloat(value), parseFloat(prev.discount))
    }));
  };

  // Handle discount change
  const handleDiscountChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      discount: value,
      offerPrice: calculateOfferPrice(parseFloat(prev.actualPrice), parseFloat(value))
    }));
  };

  // Add new color with sizes
  const handleAddColor = () => {
    if (currentColor && !colors.find(c => c.color === currentColor)) {
      const newColor = {
        color: currentColor,
        sizes: [
          { size: "XS", stock: 0 },
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 },
          { size: "2XL", stock: 0 }
        ]
      };
      setColors([...colors, newColor]);
      setCurrentColor("");
    }
  };

  // Update stock for specific color and size
  const handleStockChange = (colorIndex, sizeIndex, stock) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].sizes[sizeIndex].stock = parseInt(stock) || 0;
    setColors(updatedColors);
  };

  // Remove color
  const removeColor = (colorIndex) => {
    const updatedColors = colors.filter((_, index) => index !== colorIndex);
    setColors(updatedColors);
  };

  // Calculate total stock
  const calculateTotalStock = () => {
    return colors.reduce((total, color) => {
      return total + color.sizes.reduce((colorTotal, size) => colorTotal + size.stock, 0);
    }, 0);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Add basic product data (excluding features)
    Object.keys(formData).forEach(key => {
      if (key !== 'features') {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Add features as individual fields
    Object.keys(formData.features).forEach(featureKey => {
      if (formData.features[featureKey]) { // Only add non-empty features
        formDataToSend.append(`features[${featureKey}]`, formData.features[featureKey]);
      }
    });

    // Add colors data
    formDataToSend.append('colors', JSON.stringify(colors));

    // Add calculated total stock
    formDataToSend.append('totalStock', calculateTotalStock());

    // Add default values
    formDataToSend.append('orderCount', 0);

    // Add images
    files.forEach((file, index) => {
      formDataToSend.append(`images`, file);
    });

    try {
      const response = await addProduct(formDataToSend);
      console.log('Product added successfully:', response);
      navigate('/admin/product');
    } catch (error) {
      console.error('Error adding product:', error);
  
    }
  };
  const handleCancel = () => {
    console.log("Form cancelled");
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 md:p-6">


          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
            <ProductInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
              handleActualPriceChange={handleActualPriceChange}
              handleDiscountChange={handleDiscountChange}
            />

            <MediaDetailsSection
              formData={formData}
              handleInputChange={handleInputChange}
              files={files}
              handleFileChange={handleFileChange}
              removeFile={removeFile}
              colors={colors}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
              handleAddColor={handleAddColor}
              handleStockChange={handleStockChange}
              removeColor={removeColor}
              calculateTotalStock={calculateTotalStock}
            />
          </div>

          <div className="mt-6 sticky bottom-0 bg-white py-3 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-900 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Submit Product
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddProductForm;