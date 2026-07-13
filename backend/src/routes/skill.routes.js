"use strict";

const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes
router.get("/", skillController.getAll);

// Protected routes (Admin only)
router.post("/", authMiddleware, skillController.create);
router.put("/order", authMiddleware, skillController.updateOrder);
router.put("/:id", authMiddleware, skillController.update);
router.delete("/:id", authMiddleware, skillController.destroy);

module.exports = router;
