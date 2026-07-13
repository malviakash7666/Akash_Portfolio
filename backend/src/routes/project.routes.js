"use strict";

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.get("/", projectController.getAll);
router.get("/:id", projectController.getOne);

// Protected routes (Admin only)
router.post("/", authMiddleware, projectController.create);
router.put("/:id", authMiddleware, projectController.update);
router.delete("/:id", authMiddleware, projectController.destroy);

module.exports = router;
