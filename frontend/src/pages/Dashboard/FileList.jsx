import { FaTrash, FaDownload } from "react-icons/fa";
import fileIcon from "../../resources/file.png";

const FileList = ({
  folderStructure,
  handleFileDelete,
  handleFileDownload,
}) => {
  return (
    <>
      {folderStructure.files.map((file) => (
        <div
          key={file._id}
          className="relative group p-4 border border-gray-200 rounded shadow hover:bg-gray-50 cursor-pointer"
        >
          <img src={fileIcon} alt="File" className="w-12 h-12 mx-auto" />
          <p className="text-center mt-2 truncate">{file.name}</p>

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleFileDelete(file._id)}
              className="mx-2 p-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => handleFileDownload(file._id)}
              className="mx-2 p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
            >
              <FaDownload />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FileList;
