import PopupModal from "../../UI/PopupModal";
import folderIcorn from "../../resources/folder.png";
import fileIcon from "../../resources/file.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TopButton from "./TopButton";
import FileList from "./FileList";
import Loader from "../../UI/Loader";
const api = require("../../api/index");
const StringUtils = require("../../util/StringUtils");

function Dashboard(props) {
  const { rootfolder } = useSelector((state) => state.foldermetadata);
  const [folderStructure, setFolderStructure] = useState(rootfolder);
  const [folderPath, setFolderPath] = useState("root");
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  // error handling
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [isLoderOn, setLoaderOn] = useState(true);
  useEffect(() => {
    setFolderStructure(rootfolder);
    setLoaderOn(false);
  }, []);
  // popup methods
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const viewFolderData = async (folderPath) => {
    try {
      const res = await api.fetchFolderDetails(folderPath);
      console.log(res);
      if (res.status === 200) {
        setFolderStructure(res.data);
        setFolderPath(folderPath);
      } else {
        setErrorMessage(res.message);
        openModal();
      }
    } catch (error) {
      if (error.response !== undefined)
        setErrorMessage(error.response.data.message);
      else setErrorMessage("Something went wrong");
      openModal();
    }
  };

  const backButtonHanlder = () => {
    let backFilePath = "root";
    if (folderPath !== "root") {
      backFilePath = StringUtils.removeLastPathSegment(folderPath);
    }
    viewFolderData(backFilePath);
  };
  const createFolderHandler = async (foldername) => {
    try {
      const payload = {
        name: foldername,
        parentPath: folderPath,
      };
      const res = await api.createFolder(payload);
      if (res.status === 201) {
        viewFolderData(folderPath);
      } else {
        setErrorMessage("Error while creating folder");
        openModal();
      }
    } catch (error) {
      if (error.response !== undefined)
        setErrorMessage(error.response.data.message);
      else setErrorMessage("Something went wrong");
      openModal();
    }
  };
  const upoadFileHandler = async (file) => {
    try {
      let name = file.name;
      let size = file.size;
      let type = file.type;
      const payload = { name, size, type, parentPath: folderPath };
      console.log("File upload metadata:", payload);
      const res = await api.uploadFile(file, payload);
      if (res.status === 201) {
        viewFolderData(folderPath);
      } else {
        setErrorMessage(res.data.message);
        openModal();
      }
    } catch (error) {
      if (error.response !== undefined)
        setErrorMessage(error.response.data.message);
      else setErrorMessage("Something went wrong");
      openModal();
    }
  };
  const handleFileDownload = (id) => {};
  const handleFileDelete = (id) => {};
  if (isLoderOn)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <div className="flex h-screen">
        {/* Left Pane */}
        <div className="w-1/6 bg-gray-100 p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">User Info</h2>
            <p>Name: {session.username}</p>
          </div>
        </div>

        {/* Center Pane */}
        <div className="w-3/4 bg-white p-4">
          <TopButton
            backButtonHanlder={backButtonHanlder}
            addFolderHandler={createFolderHandler}
            uploadFilesHandler={upoadFileHandler}
          />
          <h2 className="text-xl font-bold mb-4">Folder Structure</h2>
          <br />
          <strong>{folderPath}</strong>
          <div className="grid grid-cols-5 gap-4">
            {folderStructure.folders.map((folder) => (
              <div
                key={folder._id}
                className="p-4 border border-gray-200 rounded shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => viewFolderData(folder.filePath)}
              >
                <img
                  src={folderIcorn}
                  alt="Folder"
                  className="w-12 h-12 mx-auto"
                />
                <p className="text-center mt-2 truncate">{folder.name}</p>
              </div>
            ))}
            <FileList
              folderStructure={folderStructure}
              handleFileDownload={handleFileDownload}
              handleFileDelete={handleFileDelete}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <PopupModal
          isOpen={isOpen}
          onClose={closeModal}
          title="Error"
          message={errorMessage}
          type="error"
        />
      )}
    </>
  );
}

export default Dashboard;
