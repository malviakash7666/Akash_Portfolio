"use strict";

const nodemailer = require("nodemailer");

// Create reusable transporter object using Gmail SMTP helper
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.TWO_FACTOR_EMAIL || "malviakash7666@gmail.com",
    pass: process.env.GMIL || process.env.SMTP_PASSWORD,
  },
});

/**
 * Reusable function to send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Subject of the email
 * @param {string} options.html - HTML content of the email
 */
const sendEmail = async ({ to, subject, html }) => {
  try {
    const senderEmail = process.env.TWO_FACTOR_EMAIL || "malviakash7666@gmail.com";
    const mailOptions = {
      from: `"Portfolio Admin" <${senderEmail}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✉️ Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
