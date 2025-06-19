import React, { useState } from "react";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  
  const colors = [
    { name: "black", hex: "#000000" },
    { name: "grey", hex: "#808080" },
    { name: "lightgrey", hex: "#D3D3D3" },
  ];

  return (
    <div className="color-section mb-4">
      <h5 className="fw-bold mb-3">Colors</h5>
      <div className="d-flex gap-3">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`position-relative ${
              selectedColor === color.name
                ? "border border-3 border-dark rounded-circle p-1"
                : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedColor(color.name)}
          >
            <div
              className="rounded-circle"
              style={{
                backgroundColor: color.hex,
                width: "32px",
                height: "32px",
                border: color.name === "lightgrey" ? "1px solid #ddd" : "none"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;