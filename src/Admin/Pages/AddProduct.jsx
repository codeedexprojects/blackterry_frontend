import React, { useState } from "react";
import ProductInfoSection from "../Components/AddProduct/ProductInfo";
import MediaDetailsSection from "../Components/AddProduct/MediaDetails";
import AdminLayout from "../Components/AdminLayout";
import { addProduct } from "../serveices/adminApi";

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
    
    // Add basic product data
    Object.keys(formData).forEach(key => {
      if (key === 'features') {
        formDataToSend.append('features', JSON.stringify(formData.features));
      } else {
        formDataToSend.append(key, formData[key]);
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
      // Handle success (e.g., show message, redirect, etc.)
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Create product</h1>

        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProductForm;