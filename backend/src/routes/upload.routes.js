"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/auth.middleware");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Auto-create uploads folder
const uploadDir = path.resolve("src", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File Filter (Images and PDFs only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/i;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Only images (jpg, jpeg, png) and PDFs are allowed!"));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

// Route handler
router.post("/", authMiddleware, (req, res, next) => {
  // Use upload.single("file") middle-handler
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file was uploaded",
      });
    }

    try {
      // Upload local file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "portfolio",
      });

      // Delete local temporary file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully to Cloudinary",
        url: result.secure_url,
      });
    } catch (uploadError) {
      // Cleanup local temp file if upload failed
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed: " + uploadError.message,
      });
    }
  });
});

module.exports = router;
