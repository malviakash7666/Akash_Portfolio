"use strict";

const jwt = require("jsonwebtoken");


// ===============================
// Generate Access Token
// Expire: 15 Minutes
// ===============================

const generateAccessToken = (payload) => {

  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );

};




// ===============================
// Generate Refresh Token
// Expire: 7 Days
// ===============================

const generateRefreshToken = (payload) => {

  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

};




// ===============================
// Cookie Options
// ===============================

const accessTokenCookieOptions = {

  httpOnly: true,

  secure:
    process.env.NODE_ENV === "production",

  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",

  maxAge:
    15 * 60 * 1000, // 15 minutes

};



const refreshTokenCookieOptions = {

  httpOnly: true,

  secure:
    process.env.NODE_ENV === "production",

  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",

  maxAge:
    7 * 24 * 60 * 60 * 1000, // 7 days

};



module.exports = {
  generateAccessToken,
  generateRefreshToken,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
};