import { FaTrash } from "react-icons/fa";

import folderIcorn from "../../resources/folder.png";
const FolderList = ({
  folderStructure,
  handleFolderDelete,
  viewFolderData,
}) => {
  if (folderStructure.folders === undefined) return null;
  return (
    <>
      {folderStructure.folders.map((folder) => (
        <div
          key={folder._id}
          className="p-4 border border-gray-200 rounded shadow hover:bg-gray-50 cursor-pointer"
          onClick={viewFolderData(folder.filePath)}
        >
          <img src={folderIcorn} alt="Folder" className="w-12 h-12 mx-auto" />
          <p className="text-center mt-2">{folder.name}</p>
        </div>
      ))}
    </>
  );
};

export default FolderList;
