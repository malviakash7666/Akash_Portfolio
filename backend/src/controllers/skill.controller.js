"use strict";

const db = require("../database/models");

/**
 * Get all skills
 */
const getAll = async (req, res, next) => {
  try {
    const skills = await db.Skill.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a skill (Admin only)
 */
const create = async (req, res, next) => {
  try {
    const { name, level, category } = req.body;

    if (!name || !level || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, level, and category are required",
      });
    }

    const skill = await db.Skill.create({ name, level, category });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a skill (Admin only)
 */
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, level, category } = req.body;

    const skill = await db.Skill.findByPk(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    if (name) skill.name = name;
    if (level) skill.level = level;
    if (category) skill.category = category;

    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a skill (Admin only)
 */
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const skill = await db.Skill.findByPk(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.destroy();

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk reorder skills (Admin only)
 */
const updateOrder = async (req, res, next) => {
  try {
    const { orderList } = req.body; // Expect array of { id, category, name... }

    if (!Array.isArray(orderList)) {
      return res.status(400).json({
        success: false,
        message: "orderList must be an array",
      });
    }

    // Since we don't have a separate 'order' column, we can recreate the entries in order
    // or just assume reordering is handled sequentially. Let's delete and re-insert 
    // or simply update them. Wait, Sequelize update is easy.
    // Let's perform updates in a transaction.
    await db.sequelize.transaction(async (t) => {
      for (const item of orderList) {
        await db.Skill.update(
          { category: item.category, level: item.level, name: item.name },
          { where: { id: item.id }, transaction: t }
        );
      }
    });

    const updatedSkills = await db.Skill.findAll({ order: [["id", "ASC"]] });

    return res.status(200).json({
      success: true,
      message: "Skills order updated successfully",
      skills: updatedSkills,
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
  updateOrder,
};
