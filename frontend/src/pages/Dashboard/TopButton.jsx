import { useState } from "react";

import FileUploadPopup from "./FileUploadPopup";
import AddFolderPopup from "./AddFolderPopup";
function TopButton(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenUpload, setIsPopupOpenUpload] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleAddFolder = (folderName) => {
    console.log("Folder Added:", folderName);
    // Add your folder adding logic here
    props.addFolderHandler(folderName);
  };

  const handleOpenPopupUpload = () => setIsPopupOpenUpload(true);
  const handleClosePopupUpload = () => setIsPopupOpenUpload(false);
  const handleFileUpload = (file) => {
    console.log("File Uploaded:", file);
    // Add your file upload logic here
    props.uploadFilesHandler(file);
  };
  const uploadFilesHandler = () => {};
  return (
    <>
      <div class="flex space-x-4">
        <button
          onClick={props.backButtonHanlder}
          class="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>
        <button
          onClick={handleOpenPopup}
          class="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11v6m3-3H9"
            ></path>
          </svg>
          Add Folder
        </button>
        <button
          onClick={handleOpenPopupUpload}
          class="flex items-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v16h16V4H4z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 2v4H8V2h8z"
            ></path>
          </svg>
          Upload File
        </button>
        <AddFolderPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onAddFolder={handleAddFolder}
        />
        <FileUploadPopup
          isOpen={isPopupOpenUpload}
          onClose={handleClosePopupUpload}
          onFileUpload={handleFileUpload}
        />
      </div>
    </>
  );
}

export default TopButton;
