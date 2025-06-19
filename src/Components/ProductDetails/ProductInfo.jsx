import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import ProductAccordion from "./Accordian";

const ProductInfo = ({ 
  title, 
  currentPrice, 
  originalPrice, 
  discount, 
  description 
}) => {
  return (
    <div className="product-details">
      <h1 className="fw-bold mb-3 fs-3">{title}</h1>

      <div className="price-section mb-4">
        <div className="d-flex align-items-center flex-wrap gap-2">
          <span className="current-price fw-bold fs-2 text-dark">{currentPrice}</span>
          <span className="original-price text-decoration-line-through text-muted fs-5">
            {originalPrice}
          </span>
          <span className="badge bg-success fs-6 d-inline-flex align-items-center gap-1">
            <IoMdInformationCircleOutline />
            Save {discount} right now
          </span>
        </div>
      </div>

      <ColorSelector />

      <SizeSelector />

      <QuantitySelector />

      <ActionButtons />

      <div className="product-description mb-4 p-3 bg-light rounded">
        <p className="text-muted mb-0 small">{description}</p>
      </div>

      <ProductAccordion />

      <div className="additional-info">
        <div className="d-flex align-items-center gap-2 mb-2 small text-muted">
          <FaTruck />
          <span>Free shipping in 2-3 business days</span>
        </div>
        <p className="small text-muted mb-3">Handcrafted with care, made from the heart</p>
        
        <div className="alert alert-light border-0 p-2">
          <small className="text-muted d-flex align-items-start gap-2">
            <IoMdInformationCircleOutline className="mt-1 flex-shrink-0" />
            <span>
              <strong>Color Disclaimer:</strong> Actual product colors may vary slightly due to different screen resolutions and lighting conditions.
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;