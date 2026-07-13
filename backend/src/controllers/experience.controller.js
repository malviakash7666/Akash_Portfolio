"use strict";

const db = require("../database/models");

/**
 * Get all experiences
 */
const getAll = async (req, res, next) => {
  try {
    const experiences = await db.Experience.findAll({ order: [["id", "DESC"]] });
    return res.status(200).json({
      success: true,
      experiences,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create an experience (Admin only)
 */
const create = async (req, res, next) => {
  try {
    const { role, company, location, period, description, current } = req.body;

    if (!role || !company || !period) {
      return res.status(400).json({
        success: false,
        message: "Role, company, and period are required",
      });
    }

    const experience = await db.Experience.create({
      role,
      company,
      location,
      period,
      description: description || [],
      current: current || false,
    });

    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an experience (Admin only)
 */
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, company, location, period, description, current } = req.body;

    const experience = await db.Experience.findByPk(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    if (role) experience.role = role;
    if (company) experience.company = company;
    if (location !== undefined) experience.location = location;
    if (period) experience.period = period;
    if (description !== undefined) experience.description = description;
    if (current !== undefined) experience.current = current;

    await experience.save();

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an experience (Admin only)
 */
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const experience = await db.Experience.findByPk(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    await experience.destroy();

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
  update,
  destroy,
};
