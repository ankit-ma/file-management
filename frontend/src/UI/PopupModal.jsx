import React, { useState } from "react";

const PopupModal = ({ isOpen, onClose, title, message, type }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  // Function to close the modal
  const closeModal = () => {
    console.log("close popup called");
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50 ${
          modalOpen ? "block" : "hidden"
        }`}
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded shadow-lg ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &#10005;
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          {type === "error" ? (
            <div className="bg-red-100 text-red-700 p-2 rounded">{message}</div>
          ) : type === "warning" ? (
            <div className="bg-yellow-100 text-yellow-700 p-2 rounded">
              {message}
            </div>
          ) : (
            <div>{message}</div>
          )}
        </div>

        {/* Footer */}
        <div className="text-right">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
