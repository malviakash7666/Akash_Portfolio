"use strict";

const db = require("../database/models");

/**
 * Get all projects
 */
const getAll = async (req, res, next) => {
  try {
    const { homepage } = req.query;
    const whereClause = {};
    if (homepage === "true") {
      whereClause.showOnHome = true;
    }
    const projects = await db.Project.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
    });
    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a project (Admin only)
 */
const create = async (req, res, next) => {
  try {
    const {
      title,
      problem,
      implementation,
      impact,
      techStack,
      liveLink,
      githubLink,
      category,
      image,
      features,
      screenshots,
      architecture,
      databaseDesign,
      challenges,
      learnings,
      showOnHome,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const project = await db.Project.create({
      title,
      problem,
      implementation,
      impact,
      techStack: techStack || [],
      liveLink,
      githubLink,
      category,
      image,
      features: features || [],
      screenshots: screenshots || [],
      architecture,
      databaseDesign,
      challenges,
      learnings,
      showOnHome: showOnHome !== undefined ? (showOnHome === true || showOnHome === "true") : true,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a project (Admin only)
 */
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      problem,
      implementation,
      impact,
      techStack,
      liveLink,
      githubLink,
      category,
      image,
      features,
      screenshots,
      architecture,
      databaseDesign,
      challenges,
      learnings,
      showOnHome,
    } = req.body;

    const project = await db.Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (title) project.title = title;
    if (problem !== undefined) project.problem = problem;
    if (implementation !== undefined) project.implementation = implementation;
    if (impact !== undefined) project.impact = impact;
    if (techStack !== undefined) project.techStack = techStack;
    if (liveLink !== undefined) project.liveLink = liveLink;
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (category !== undefined) project.category = category;
    if (image !== undefined) project.image = image;
    if (features !== undefined) project.features = features;
    if (screenshots !== undefined) project.screenshots = screenshots;
    if (architecture !== undefined) project.architecture = architecture;
    if (databaseDesign !== undefined) project.databaseDesign = databaseDesign;
    if (challenges !== undefined) project.challenges = challenges;
    if (learnings !== undefined) project.learnings = learnings;
    if (showOnHome !== undefined) project.showOnHome = showOnHome === true || showOnHome === "true";

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project (Admin only)
 */
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await db.Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.destroy();

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Get single project details
 */
const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await db.Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
};
