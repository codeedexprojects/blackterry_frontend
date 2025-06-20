import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ShopFilterBar = ({ productCount }) => {
  return (
    <div className="container py-2 mb-5">
      <div className="row align-items-center g-2">
        <div className="col-md-8 d-flex flex-wrap align-items-center">
          <h6 className="me-2 mb-0">Filter:</h6>

          <Dropdown className="me-2 mb-0">
            <Dropdown.Toggle variant="" size="sm">
              AVAILABILITY
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Available</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Out of Stock</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mb-0">
            <Dropdown.Toggle variant="" size="sm">
              PRICE
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Low to High</Dropdown.Item>
              <Dropdown.Item href="#/action-2">High to Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Right Side: Sort & Product Count */}
        <div className="col-md-4 d-flex justify-content-md-end align-items-center flex-wrap">
          <span className="fw-sm me-2">Sort By:</span>

          <Dropdown className="me-2">
            <Dropdown.Toggle variant="" size="sm">
              Availability
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Available</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Out of Stock</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
            {productCount} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopFilterBar;