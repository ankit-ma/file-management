const Folder = require("../model/Folder");
const File = require("../model/File");

const HttpError = require("../model/Http-error");

const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res, next) => {
  const { name, parentPath, type, size } = req.body;
  const file = req.file;
  const filePath = path.join(parentPath, name);

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const parentFolder = await Folder.findOne({
      filePath: parentPath,
      user: req.user.user_id,
    });

    if (!parentFolder) {
      return res.status(404).json({ message: "Parent folder not found" });
    }

    // check file with same name already exist?
    const folderExists = await File.findOne({
      filePath: `${parentPath}/${name}`,
      user: req.user.user_id,
    });

    if (folderExists) {
      return res.status(400).json({ message: "File already exists" });
    }

    // Create directory if it doesn't exist
    const dirPath = path.join(__dirname, "..", "uploads", parentPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Save file to local storage
    const localFilePath = path.join(__dirname, "..", "uploads", filePath);
    fs.writeFileSync(localFilePath, file.buffer);

    const publicUrl = `uploads/${filePath}`;

    const newFile = new File({
      name,
      filePath: `${parentPath}/${name}`,
      user: req.user.user_id,
      type,
      size,
      url: publicUrl,
    });
    const savedFile = await newFile.save();

    parentFolder.files.push(savedFile._id);
    await parentFolder.save();

    res.status(201).json(savedFile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { fileId } = req.body;
    const userId = req.query.userId || req.params.userId || req.body.userId;
    const file = await File.findOne({ _id: fileId, user: userId });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.join(__dirname, "../uploads", file.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await File.deleteOne({ _id: fileId, user: userId });

    const parentFolderPath = path.dirname(file.filePath);
    const parentFolder = await Folder.findOne({
      filePath: parentFolderPath,
      user: userId,
    });
    if (parentFolder) {
      parentFolder.files.pull(file._id);
      await parentFolder.save();
    }

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};
