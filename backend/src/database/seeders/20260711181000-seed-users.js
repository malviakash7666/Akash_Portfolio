"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingAdmins = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE role = 'admin' LIMIT 1;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingAdmins && existingAdmins.length > 0) {
      console.log("⚠️ Admin user already exists. Skipping user seeding.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin@12345", 10);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Akash Malvi",
        email: "admin@portfolio.com",
        password: hashedPassword,
        role: "admin",
        bio: "I am a passionate Full Stack Developer who enjoys building modern and scalable web applications.",
        heroDescription: "Building premium full-stack web solutions with modern tools and performance optimization.",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
        resumeUrl: "",
        socialLinks: JSON.stringify({
          github: "https://github.com/malviakash7666",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { role: "admin" }, {});
  },
};
