"use strict";

const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.get("/", experienceController.getAll);

// Protected routes (Admin only)
router.post("/", authMiddleware, experienceController.create);
router.put("/:id", authMiddleware, experienceController.update);
router.delete("/:id", authMiddleware, experienceController.destroy);

module.exports = router;
