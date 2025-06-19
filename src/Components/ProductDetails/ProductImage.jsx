import React from "react";

const ProductImageGallery = ({ mainImage, thumbnails }) => {
  return (
    <div className="row gx-4">
      <div className="col-md-1 d-none d-md-block">
        <div className="d-flex flex-column gap-3">
          {thumbnails.map((img, idx) => (
            <div 
              key={idx} 
              className="border rounded overflow-hidden" 
              style={{ cursor: "pointer", aspectRatio: "1/1" }}
            >
              <img
                src={img}
                alt={`Small view ${idx + 1}`}
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="col-md-5">
        <div className="position-sticky" style={{ top: "20px" }}>
          <div className="border rounded overflow-hidden">
            <img src={mainImage} alt="Main Product" className="img-fluid w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;