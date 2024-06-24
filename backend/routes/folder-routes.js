const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const folderController = require("../controller/folder-controller");

router.get("/root/contents", authMiddleware, folderController.getRootDirectory);
router.post("/create", authMiddleware, folderController.createFolder);
router.post("/contents", authMiddleware, folderController.getFolderDirectory);
router.delete("/delete", authMiddleware, folderController.deleteFolder);

module.exports = router;
