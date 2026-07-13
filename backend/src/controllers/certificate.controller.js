"use strict";

const db = require("../database/models");

/**
 * Get all certificates
 */
const getAll = async (req, res, next) => {
  try {
    const certificates = await db.Certificate.findAll({ order: [["id", "DESC"]] });
    return res.status(200).json({
      success: true,
      certificates,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a certificate (Admin only)
 */
const create = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, link, image } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({
        success: false,
        message: "Title and issuer are required",
      });
    }

    const certificate = await db.Certificate.create({
      title,
      issuer,
      issueDate,
      link,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      certificate,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a certificate (Admin only)
 */
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, issuer, issueDate, link, image } = req.body;

    const certificate = await db.Certificate.findByPk(id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    if (title) certificate.title = title;
    if (issuer) certificate.issuer = issuer;
    if (issueDate !== undefined) certificate.issueDate = issueDate;
    if (link !== undefined) certificate.link = link;
    if (image !== undefined) certificate.image = image;

    await certificate.save();

    return res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      certificate,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a certificate (Admin only)
 */
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const certificate = await db.Certificate.findByPk(id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    await certificate.destroy();

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
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
