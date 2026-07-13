"use strict";

const path = require("path");
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    let skills = [];
    try {
      const skillsPath = path.join(__dirname, "../../../../Frontend/src/utils/skills.json");
      if (fs.existsSync(skillsPath)) {
        const fileData = fs.readFileSync(skillsPath, "utf8");
        const jsonData = JSON.parse(fileData);
        skills = jsonData.technicalSkills || [];
      } else {
        console.log("⚠️ skills.json not found at:", skillsPath);
      }
    } catch (err) {
      console.error("❌ Error reading skills.json:", err.message);
    }

    if (skills.length === 0) {
      console.log("No skills found to seed.");
      return;
    }

    // Check if skills table is already seeded
    const existingSkillsCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM "Skills";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const count = parseInt(existingSkillsCount[0].count, 10);
    if (count > 0) {
      console.log("⚠️ Skills table is already seeded. Skipping.");
      return;
    }

    const seedData = skills.map((skill) => ({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Skills", seedData);
    console.log(`✅ Seeded ${seedData.length} skills successfully.`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Skills", null, {});
  },
};
