const Folder = require("../model/Folder");
const File = require("../model/File");

const HttpError = require("../model/Http-error");

const getRootDirectory = async (req, res) => {
  console.log("Call is in root directory call req", req.query.userId);

  try {
    const rootFolder = await Folder.findOne({
      filePath: "root",
      user: req.query.userId,
    })
      .populate("children")
      .populate("files");
    if (!rootFolder) {
      return res.status(404).json({ message: "Root folder not found" });
    }

    const contents = {
      folders: rootFolder.children,
      files: rootFolder.files,
    };

    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFolderDirectory = async (req, res) => {
  //console.log("Call is in root directory call req",req);
  const userId = req.query.userId || req.params.userId;
  const filePath = req.body.filePath;
  console.log("User Id:", userId);
  console.log("FilePath:", filePath);
  try {
    const rootFolder = await Folder.findOne({ filePath, user: userId })
      .populate("children")
      .populate("files");
    if (!rootFolder) {
      return res.status(404).json({ message: "folder not found" });
    }
    // if(rootFolder.children.length===0 && rootFolder.files.length ===0){
    //   return res.status(404).json({ message: 'No files or folder found' });
    // }
    const contents = {
      folders: rootFolder.children,
      files: rootFolder.files,
    };

    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createFolder = async (req, res) => {
  const { name, parentPath } = req.body;
  const filePath = `${parentPath}/${name}`;
  const userId = req.query.userId || req.params.userId || req.body.userId;
  try {
    const parentFolder = await Folder.findOne({
      filePath: parentPath,
      user: userId,
    });

    if (!parentFolder) {
      return res
        .status(404)
        .json({ message: "Parent folder not found/ folder already exist" });
    }
    // add check for the name in parentFolder childs
    const folderExists = await Folder.findOne({
      name,
      filePath: `${parentPath}/${name}`,
      user: userId,
    });

    if (folderExists) {
      return res.status(400).json({ message: "Folder already exists" });
    }

    const newFolder = new Folder({
      name,
      filePath,
      user: userId,
      children: [],
      files: [],
    });
    const savedFolder = await newFolder.save();

    parentFolder.children.push(savedFolder._id);
    await parentFolder.save();

    res.status(201).json(savedFolder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteFolderContents = async (folder) => {
  // Delete all files in the folder
  for (const fileId of folder.files) {
    const file = await File.findById(fileId);
    if (file) {
      const filePath = path.join(__dirname, "..", file.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await File.deleteOne({ _id: fileId });
    }
  }

  // Recursively delete all subfolders
  for (const childFolderId of folder.children) {
    const childFolder = await Folder.findById(childFolderId);
    if (childFolder) {
      await deleteFolderContents(childFolder);
      await Folder.deleteOne({ _id: childFolderId });
    }
  }
};

const deleteFolder = async (req, res) => {
  const folderId = req.body.folderId; // Ensure this line gets the folderId from query parameters
  const userId = req.query.userId || req.params.userId || req.body.userId;

  if (!folderId) {
    return res.status(400).json({ message: "folderId is required" });
  }

  try {
    const folder = await Folder.findOne({ _id: folderId, user: userId });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Recursively delete all contents
    await deleteFolderContents(folder);

    // Delete the folder itself
    await Folder.deleteOne({ _id: folder._id });

    // Remove folder reference from parent folder
    const parentFolder = await Folder.findOne({
      children: folder._id,
      user: userId,
    });
    if (parentFolder) {
      parentFolder.children.pull(folder._id);
      await parentFolder.save();
    }

    res
      .status(200)
      .json({ message: "Folder and all its contents deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRootDirectory = getRootDirectory;
exports.createFolder = createFolder;
exports.getFolderDirectory = getFolderDirectory;
exports.deleteFolder = deleteFolder;
