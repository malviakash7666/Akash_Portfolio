"use strict";

const path = require("path");
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    let experiences = [];
    try {
      const experiencePath = path.join(__dirname, "../../../../Frontend/src/utils/experience.json");
      if (fs.existsSync(experiencePath)) {
        const fileData = fs.readFileSync(experiencePath, "utf8");
        const jsonData = JSON.parse(fileData);
        experiences = jsonData.experiences || [];
      } else {
        console.log("⚠️ experience.json not found at:", experiencePath);
      }
    } catch (err) {
      console.error("❌ Error reading experience.json:", err.message);
    }

    if (experiences.length === 0) {
      console.log("No experiences found to seed.");
      return;
    }

    // Check if experiences table is already seeded
    const existingExperiencesCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM "Experiences";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const count = parseInt(existingExperiencesCount[0].count, 10);
    if (count > 0) {
      console.log("⚠️ Experiences table is already seeded. Skipping.");
      return;
    }

    const seedData = experiences.map((exp) => ({
      role: exp.role,
      company: exp.company,
      location: exp.location || null,
      period: exp.period,
      description: JSON.stringify(exp.description || []),
      current: exp.current || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Experiences", seedData);
    console.log(`✅ Seeded ${seedData.length} experiences successfully.`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Experiences", null, {});
  },
};
