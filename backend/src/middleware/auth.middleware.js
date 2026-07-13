"use strict";

const jwt = require("jsonwebtoken");
const db = require("../database/models");

const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // Check accessToken cookie first
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } 
    // Fallback to Authorization Header (Bearer token)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid or expired access token",
        });
      }

      try {
        const user = await db.User.findByPk(decoded.id);
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized: User not found",
          });
        }

        // Attach user info to request (excluding password)
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          bio: user.bio,
          heroDescription: user.heroDescription,
          profileImage: user.profileImage,
          resumeUrl: user.resumeUrl,
          socialLinks: user.socialLinks,
          adminTwoFactorEnabled: user.adminTwoFactorEnabled,
        };

        next();
      } catch (dbError) {
        next(dbError);
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
