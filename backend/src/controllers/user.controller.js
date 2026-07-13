"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/models");
const {
  generateAccessToken,
  generateRefreshToken,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} = require("../utils/token.utils");
const { generateOTP, hashOTP, verifyOTP } = require("../utils/otp.util");
const { sendEmail } = require("../services/email.service");

/**
 * Admin Login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify role (Admin only)
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin login only",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔐 Check if 2FA is enabled
    if (user.adminTwoFactorEnabled) {
      const otp = generateOTP();
      const otpHash = hashOTP(otp);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Store OTP in database
      await db.AdminOtpVerification.create({
        userId: user.id,
        otpHash,
        expiresAt,
        type: "LOGIN_2FA",
        attempts: 0,
      });

      // Send OTP via Email
      const emailHtml = `
        <div style="font-family: sans-serif; padding: 25px; color: #333; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">Two-Factor Authentication (2FA)</h2>
          <p style="font-size: 14px; line-height: 1.5; color: #475569;">You are attempting to sign in to your Admin Portfolio Dashboard. Use the verification code below to complete the sign-in:</p>
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #4f46e5; margin: 30px 0; background: #f8fafc; padding: 15px; text-align: center; border-radius: 8px; border: 1px solid #f1f5f9; font-family: monospace;">${otp}</div>
          <p style="font-size: 12px; color: #64748b; margin-top: 20px;">This code is valid for 5 minutes. If you did not initiate this request, please change your credentials immediately.</p>
        </div>
      `;

      await sendEmail({
        to: process.env.TWO_FACTOR_EMAIL || "malviakash7666@gmail.com",
        subject: "Admin Dashboard Login Verification Code",
        html: emailHtml,
      });

      return res.status(200).json({
        success: true,
        requiresTwoFactor: true,
        message: "OTP sent to admin email",
      });
    }

    // Generate tokens (2FA disabled flow)
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminTwoFactorEnabled: user.adminTwoFactorEnabled,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Current Logged-in User Profile
 */
const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh Access Token
 */
const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No refresh token provided",
      });
    }

    // Verify Refresh Token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid or expired refresh token",
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

        // Generate new Access Token
        const payload = { id: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);

        // Update Access Token cookie
        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        return res.status(200).json({
          success: true,
          message: "Token refreshed successfully",
        });
      } catch (dbError) {
        next(dbError);
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Profile details
 */
const updateProfile = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, bio, heroDescription, profileImage, resumeUrl, socialLinks, adminTwoFactorEnabled } = req.body;

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (heroDescription !== undefined) user.heroDescription = heroDescription;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (resumeUrl !== undefined) user.resumeUrl = resumeUrl;
    if (socialLinks !== undefined) user.socialLinks = socialLinks;
    if (adminTwoFactorEnabled !== undefined) user.adminTwoFactorEnabled = adminTwoFactorEnabled;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
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
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify OTP (2FA check)
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find the user
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the latest active OTP verification record
    const verification = await db.AdminOtpVerification.findOne({
      where: {
        userId: user.id,
        type: "LOGIN_2FA",
        verifiedAt: null,
      },
      order: [["createdAt", "DESC"]],
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: "No OTP request found. Please login again.",
      });
    }

    // Check expiration
    if (new Date() > new Date(verification.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please login again.",
      });
    }

    // Check attempts limit (e.g. max 5 attempts)
    const MAX_ATTEMPTS = 5;
    if (verification.attempts >= MAX_ATTEMPTS) {
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please login again.",
      });
    }

    // Verify OTP
    const isOtpValid = verifyOTP(otp, verification.otpHash);

    if (!isOtpValid) {
      // Increment attempts
      verification.attempts += 1;
      await verification.save();

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. Attempts remaining: ${MAX_ATTEMPTS - verification.attempts}`,
      });
    }

    // Mark as verified
    verification.verifiedAt = new Date();
    await verification.save();

    // Generate tokens
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminTwoFactorEnabled: user.adminTwoFactorEnabled,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get public profile details (for visitors)
 */
const getPublicProfile = async (req, res, next) => {
  try {
    const admin = await db.User.findOne({
      where: { role: "admin" },
      attributes: ["name", "bio", "heroDescription", "profileImage", "resumeUrl", "socialLinks"],
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
  refresh,
  updateProfile,
  getPublicProfile,
  verifyOtp,
};
