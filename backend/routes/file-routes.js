const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const fileController = require("../controller/file-controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  fileController.uploadFile
);
router.delete("/delete", authMiddleware, fileController.deleteFile);
module.exports = router;
