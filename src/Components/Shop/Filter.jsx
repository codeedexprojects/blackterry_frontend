import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const ShopFilterBar = ({ productCount, onFilter, products = [] }) => {
  const [filters, setFilters] = useState({
    availability: '',
    priceRange: '',
    gender: '',
    material: '',
    fit: '',
    occasion: '',
    sortBy: ''
  });

  // Custom style for the primary filter buttons
  const customPrimaryStyle = {
    backgroundColor: '#50311D',
    borderColor: '#50311D',
    color: 'white'
  };

  // Extract unique filter options from products
  const getFilterOptions = () => {
    const options = {
      genders: [...new Set(products.map(p => p.features?.gender).filter(Boolean))],
      materials: [...new Set(products.map(p => p.features?.material).filter(Boolean))],
      fits: [...new Set(products.map(p => p.features?.fit).filter(Boolean))],
      occasions: [...new Set(products.map(p => p.features?.occasion).filter(Boolean))]
    };
    return options;
  };

  const filterOptions = getFilterOptions();

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      availability: '',
      priceRange: '',
      gender: '',
      material: '',
      fit: '',
      occasion: '',
      sortBy: ''
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <div className="container py-3 mb-4">
      <div className="row align-items-center g-3">
        {/* Left Side: Filters - Full width on mobile */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <h6 className="me-2 mb-0 text-nowrap d-none d-sm-block">Filter:</h6>

            {/* Mobile filter toggle - only shows on small screens */}
            <div className="d-block d-lg-none w-100 mb-2">
              <Dropdown className="w-100">
                <Dropdown.Toggle 
                  variant={hasActiveFilters ? "primary" : "outline-secondary"} 
                  size="sm"
                  className="w-100"
                  style={hasActiveFilters ? customPrimaryStyle : {}}
                >
                  <i className="fas fa-filter me-2"></i>
                  Filters {hasActiveFilters && `(${Object.values(filters).filter(f => f !== '').length})`}
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-3" style={{ width: '100%' }}>
                  <div className="row g-2">
                    {/* Availability Filter */}
                    <div className="col-6">
                      <label className="small mb-1">Availability</label>
                      <select 
                        className="form-select form-select-sm"
                        value={filters.availability}
                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="col-6">
                      <label className="small mb-1">Price</label>
                      <select 
                        className="form-select form-select-sm"
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="0-500">Under ₹500</option>
                        <option value="500-1000">₹500 - ₹1000</option>
                        <option value="1000-2000">₹1000 - ₹2000</option>
                        <option value="2000-5000">₹2000 - ₹5000</option>
                        <option value="5000+">Above ₹5000</option>
                      </select>
                    </div>

                    {/* Gender Filter */}
                    {filterOptions.genders.length > 0 && (
                      <div className="col-6">
                        <label className="small mb-1">Gender</label>
                        <select 
                          className="form-select form-select-sm"
                          value={filters.gender}
                          onChange={(e) => handleFilterChange('gender', e.target.value)}
                        >
                          <option value="">All</option>
                          {filterOptions.genders.map(gender => (
                            <option key={gender} value={gender}>{gender}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Material Filter */}
                    {filterOptions.materials.length > 0 && (
                      <div className="col-6">
                        <label className="small mb-1">Material</label>
                        <select 
                          className="form-select form-select-sm"
                          value={filters.material}
                          onChange={(e) => handleFilterChange('material', e.target.value)}
                        >
                          <option value="">All</option>
                          {filterOptions.materials.map(material => (
                            <option key={material} value={material}>{material}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Fit Filter */}
                    {filterOptions.fits.length > 0 && (
                      <div className="col-6">
                        <label className="small mb-1">Fit</label>
                        <select 
                          className="form-select form-select-sm"
                          value={filters.fit}
                          onChange={(e) => handleFilterChange('fit', e.target.value)}
                        >
                          <option value="">All</option>
                          {filterOptions.fits.map(fit => (
                            <option key={fit} value={fit}>{fit}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Occasion Filter */}
                    {filterOptions.occasions.length > 0 && (
                      <div className="col-6">
                        <label className="small mb-1">Occasion</label>
                        <select 
                          className="form-select form-select-sm"
                          value={filters.occasion}
                          onChange={(e) => handleFilterChange('occasion', e.target.value)}
                        >
                          <option value="">All</option>
                          {filterOptions.occasions.map(occasion => (
                            <option key={occasion} value={occasion}>{occasion}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Clear Filters Button */}
                    <div className="col-12 mt-2">
                      <button 
                        onClick={clearFilters}
                        className="btn btn-outline-danger btn-sm w-100"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Desktop filters - hidden on mobile */}
            <div className="d-none d-lg-flex flex-wrap align-items-center gap-2">
              {/* Availability Filter */}
              <Dropdown className="me-2">
                <Dropdown.Toggle 
                  variant={filters.availability ? "primary" : "outline-secondary"} 
                  size="sm"
                  className="text-nowrap"
                  style={filters.availability ? customPrimaryStyle : {}}
                >
                  {filters.availability || "AVAILABILITY"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('availability', 'In Stock')}
                    active={filters.availability === 'In Stock'}
                  >
                    In Stock
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('availability', 'Out of Stock')}
                    active={filters.availability === 'Out of Stock'}
                  >
                    Out of Stock
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Price Range Filter */}
              <Dropdown className="me-2">
                <Dropdown.Toggle 
                  variant={filters.priceRange ? "primary" : "outline-secondary"} 
                  size="sm"
                  className="text-nowrap"
                  style={filters.priceRange ? customPrimaryStyle : {}}
                >
                  {filters.priceRange || "PRICE"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('priceRange', '0-500')}
                    active={filters.priceRange === '0-500'}
                  >
                    Under ₹500
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('priceRange', '500-1000')}
                    active={filters.priceRange === '500-1000'}
                  >
                    ₹500 - ₹1000
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('priceRange', '1000-2000')}
                    active={filters.priceRange === '1000-2000'}
                  >
                    ₹1000 - ₹2000
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('priceRange', '2000-5000')}
                    active={filters.priceRange === '2000-5000'}
                  >
                    ₹2000 - ₹5000
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => handleFilterChange('priceRange', '5000+')}
                    active={filters.priceRange === '5000+'}
                  >
                    Above ₹5000
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Gender Filter */}
              {filterOptions.genders.length > 0 && (
                <Dropdown className="me-2">
                  <Dropdown.Toggle 
                    variant={filters.gender ? "primary" : "outline-secondary"} 
                    size="sm"
                    className="text-nowrap"
                    style={filters.gender ? customPrimaryStyle : {}}
                  >
                    {filters.gender || "GENDER"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterOptions.genders.map(gender => (
                      <Dropdown.Item 
                        key={gender}
                        onClick={() => handleFilterChange('gender', gender)}
                        active={filters.gender === gender}
                      >
                        {gender}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* Material Filter */}
              {filterOptions.materials.length > 0 && (
                <Dropdown className="me-2">
                  <Dropdown.Toggle 
                    variant={filters.material ? "primary" : "outline-secondary"} 
                    size="sm"
                    className="text-nowrap"
                    style={filters.material ? customPrimaryStyle : {}}
                  >
                    {filters.material || "MATERIAL"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterOptions.materials.map(material => (
                      <Dropdown.Item 
                        key={material}
                        onClick={() => handleFilterChange('material', material)}
                        active={filters.material === material}
                      >
                        {material}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* Fit Filter */}
              {filterOptions.fits.length > 0 && (
                <Dropdown className="me-2">
                  <Dropdown.Toggle 
                    variant={filters.fit ? "primary" : "outline-secondary"} 
                    size="sm"
                    className="text-nowrap"
                    style={filters.fit ? customPrimaryStyle : {}}
                  >
                    {filters.fit || "FIT"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterOptions.fits.map(fit => (
                      <Dropdown.Item 
                        key={fit}
                        onClick={() => handleFilterChange('fit', fit)}
                        active={filters.fit === fit}
                      >
                        {fit}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* Occasion Filter */}
              {filterOptions.occasions.length > 0 && (
                <Dropdown className="me-2">
                  <Dropdown.Toggle 
                    variant={filters.occasion ? "primary" : "outline-secondary"} 
                    size="sm"
                    className="text-nowrap"
                    style={filters.occasion ? customPrimaryStyle : {}}
                  >
                    {filters.occasion || "OCCASION"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterOptions.occasions.map(occasion => (
                      <Dropdown.Item 
                        key={occasion}
                        onClick={() => handleFilterChange('occasion', occasion)}
                        active={filters.occasion === occasion}
                      >
                        {occasion}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="btn btn-outline-danger btn-sm"
                  style={{ fontSize: '12px' }}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Sort & Product Count */}
        <div className="col-12 col-lg-4">
          <div className="d-flex justify-content-between justify-content-lg-end align-items-center flex-wrap gap-2">
            <span className="fw-normal text-nowrap" style={{ fontSize: '14px' }}>Sort By:</span>

            <Dropdown>
              <Dropdown.Toggle 
                variant={filters.sortBy ? "primary" : "outline-secondary"} 
                size="sm"
                className="text-nowrap"
                style={filters.sortBy ? customPrimaryStyle : {}}
              >
                {filters.sortBy ? (
                  <>
                    {filters.sortBy === 'price-low-high' && 'Price: Low to High'}
                    {filters.sortBy === 'price-high-low' && 'Price: High to Low'}
                    {filters.sortBy === 'name-a-z' && 'Name: A to Z'}
                    {filters.sortBy === 'name-z-a' && 'Name: Z to A'}
                    {filters.sortBy === 'newest' && 'Newest First'}
                    {filters.sortBy === 'popularity' && 'Most Popular'}
                  </>
                ) : 'Default'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={() => handleFilterChange('sortBy', 'price-low-high')}
                  active={filters.sortBy === 'price-low-high'}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => handleFilterChange('sortBy', 'price-high-low')}
                  active={filters.sortBy === 'price-high-low'}
                >
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => handleFilterChange('sortBy', 'name-a-z')}
                  active={filters.sortBy === 'name-a-z'}
                >
                  Name: A to Z
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => handleFilterChange('sortBy', 'name-z-a')}
                  active={filters.sortBy === 'name-z-a'}
                >
                  Name: Z to A
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => handleFilterChange('sortBy', 'newest')}
                  active={filters.sortBy === 'newest'}
                >
                  Newest First
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => handleFilterChange('sortBy', 'popularity')}
                  active={filters.sortBy === 'popularity'}
                >
                  Most Popular
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="text-muted text-nowrap" style={{ fontSize: "12px" }}>
              {productCount} product{productCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <small className="text-muted">Active filters:</small>
              {Object.entries(filters).map(([key, value]) => 
                value && (
                  <span 
                    key={key} 
                    className="badge d-flex align-items-center gap-1"
                    style={{ 
                      backgroundColor: '#50311D',
                      fontSize: '11px' 
                    }}
                  >
                    {key}: {value}
                    <button 
                      onClick={() => handleFilterChange(key, '')}
                      className="btn-close btn-close-white"
                      style={{ fontSize: '8px' }}
                      aria-label="Remove filter"
                    ></button>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopFilterBar;