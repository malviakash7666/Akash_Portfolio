"use strict";

const crypto = require("crypto");

/**
 * Generate a secure 6-digit OTP code.
 * @returns {string} 6-digit numeric string
 */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Hash an OTP code using SHA-256.
 * @param {string} otp - The raw 6-digit OTP code
 * @returns {string} Hex-encoded SHA-256 hash
 */
const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

/**
 * Compare a raw OTP code with a stored hash.
 * @param {string} otp - The raw 6-digit OTP code to verify
 * @param {string} hashedOtp - The stored hex-encoded SHA-256 hash
 * @returns {boolean} True if they match, false otherwise
 */
const verifyOTP = (otp, hashedOtp) => {
  const computedHash = hashOTP(otp);
  return computedHash === hashedOtp;
};

module.exports = {
  generateOTP,
  hashOTP,
  verifyOTP,
};
