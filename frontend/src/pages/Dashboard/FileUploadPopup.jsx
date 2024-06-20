import React, { useState } from "react";

const FileUploadPopup = ({ isOpen, onClose, onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "text/plain",
      "image/png",
    ];
    if (
      selectedFile &&
      allowedTypes.includes(selectedFile.type) &&
      selectedFile.size <= 500 * 1024
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("File size exceeds 500KB or unsupported file type.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
      setFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Upload File</h2>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 p-4 mb-4 rounded"
        >
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            <svg
              className="w-10 h-10 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V12a4 4 0 018 0v4M7 8v4m4 4v4m0-4h4m-4 0H7m8-4h4M7 8V4h8m0 0L11 0"
              ></path>
            </svg>
            <span className="text-gray-600">
              Drag & Drop or Click to Browse
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpeg,.jpg,.txt,.png"
            />
          </label>
        </div>
        {file && (
          <div className="mt-4">
            <p>Selected file: {file.name}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPopup;
