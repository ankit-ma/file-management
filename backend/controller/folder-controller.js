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

exports.getRootDirectory = getRootDirectory;
exports.createFolder = createFolder;
exports.getFolderDirectory = getFolderDirectory;
