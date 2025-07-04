import React from "react";

const EditFileUploader = ({ files, handleFileChange, removeFile }) => {
  return (
    <>
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center justify-center">
        <p className="text-gray-700 mb-2 text-sm md:text-base">
          Browse Files to upload
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors"
        >
          Choose Files
        </label>
      </div>

      {files.length > 0 && (
        <div className="max-h-40 overflow-y-auto">
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                    📄
                  </div>
                  <span className="truncate max-w-[180px] md:max-w-xs">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default EditFileUploader;