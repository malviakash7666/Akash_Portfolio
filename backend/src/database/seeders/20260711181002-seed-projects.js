"use strict";

const path = require("path");
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    let projects = [];
    try {
      const projectsPath = path.join(__dirname, "../../../../Frontend/src/utils/projects.json");
      if (fs.existsSync(projectsPath)) {
        const fileData = fs.readFileSync(projectsPath, "utf8");
        const jsonData = JSON.parse(fileData);
        projects = jsonData.projects || [];
      } else {
        console.log("⚠️ projects.json not found at:", projectsPath);
      }
    } catch (err) {
      console.error("❌ Error reading projects.json:", err.message);
    }

    if (projects.length === 0) {
      console.log("No projects found to seed.");
      return;
    }

    // Check if projects table is already seeded
    const existingProjectsCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM "Projects";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const count = parseInt(existingProjectsCount[0].count, 10);
    if (count > 0) {
      console.log("⚠️ Projects table is already seeded. Skipping.");
      return;
    }

    const seedData = projects.map((project) => ({
      title: project.title,
      problem: project.problem || null,
      implementation: project.implementation || null,
      impact: project.impact || null,
      techStack: JSON.stringify(project.techStack || []),
      liveLink: project.liveLink || null,
      githubLink: project.githubLink || null,
      category: project.category || null,
      image: null, // default to null, can be updated via upload later
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Projects", seedData);
    console.log(`✅ Seeded ${seedData.length} projects successfully.`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
