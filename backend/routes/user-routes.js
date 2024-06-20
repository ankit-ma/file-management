const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const authMiddleware = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/delete", authMiddleware, userController.deleteUser);
router.get("/otp", userController.sendOTP);
router.post("/verifyOtp", userController.verifyOTP);

module.exports = router;
