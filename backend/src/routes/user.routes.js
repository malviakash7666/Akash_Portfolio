"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public Route: Login
router.post("/login", userController.login);

// Public Route: Refresh Token
router.post("/refresh", userController.refresh);

// Public Route: Get Public Profile Details
router.get("/profile", userController.getPublicProfile);

// Public Route: Verify OTP for 2FA
router.post("/verify-otp", userController.verifyOtp);

// Protected Routes
router.get("/me", authMiddleware, userController.getMe);
router.put("/profile", authMiddleware, userController.updateProfile);

module.exports = router;
