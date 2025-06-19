import React from "react";

const ProductAccordion = () => {
  return (
    <div className="accordion accordion-flush mb-4" id="productAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Product Specifications
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
          <div className="accordion-body">
            <ul className="list-unstyled mb-0">
              <li><strong>Material:</strong> 100% Cotton</li>
              <li><strong>Fit:</strong> Regular</li>
              <li><strong>Sleeve:</strong> Short</li>
              <li><strong>Neckline:</strong> Crew Neck</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Shipping & Return
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
          <div className="accordion-body">
            <ul className="list-unstyled mb-0">
              <li>✓ Free shipping on orders above ₹999</li>
              <li>✓ 30-day return policy</li>
              <li>✓ Easy returns and exchanges</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed fw-bold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Wash Care
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#productAccordion">
          <div className="accordion-body">
            <ul className="list-unstyled mb-0">
              <li>• Machine wash cold</li>
              <li>• Do not bleach</li>
              <li>• Tumble dry low</li>
              <li>• Iron on low heat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAccordion;