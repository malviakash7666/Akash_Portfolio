"use strict";

const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.get("/", certificateController.getAll);

// Protected routes (Admin only)
router.post("/", authMiddleware, certificateController.create);
router.put("/:id", authMiddleware, certificateController.update);
router.delete("/:id", authMiddleware, certificateController.destroy);

module.exports = router;
