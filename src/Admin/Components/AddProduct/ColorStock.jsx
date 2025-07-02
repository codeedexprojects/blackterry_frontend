import React from "react";

const ColorStockManager = ({
  colors,
  currentColor,
  setCurrentColor,
  handleAddColor,
  handleStockChange,
  removeColor,
  calculateTotalStock
}) => {
  return (
    <>
      <div>
        <label className="block mb-2 text-sm md:text-base font-medium">
          Add Color with Stock
        </label>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <input
            type="text"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="p-2 border rounded-md w-full sm:flex-1 text-sm md:text-base"
            placeholder="Enter color name"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="w-full sm:w-auto px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm md:text-base font-medium transition-colors"
          >
            + ADD COLOR
          </button>
        </div>
      </div>

      {colors.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Colors & Stock Management</h3>
          {colors.map((colorItem, colorIndex) => (
            <div key={colorIndex} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-base">Color: {colorItem.color}</h4>
                <button
                  type="button"
                  onClick={() => removeColor(colorIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colorItem.sizes.map((sizeItem, sizeIndex) => (
                  <div key={sizeIndex} className="flex items-center gap-2">
                    <label className="text-sm font-medium w-8">{sizeItem.size}:</label>
                    <input
                      type="number"
                      min="0"
                      value={sizeItem.stock}
                      onChange={(e) => handleStockChange(colorIndex, sizeIndex, e.target.value)}
                      className="w-16 p-1 border rounded text-sm"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-sm font-medium">
            Total Stock: {calculateTotalStock()}
          </div>
        </div>
      )}
    </>
  );
};

export default ColorStockManager;