"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const existingCount = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM "Certificates";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const count = parseInt(existingCount[0].count, 10);
    if (count > 0) {
      console.log("⚠️ Certificates table is already seeded. Skipping.");
      return;
    }

    await queryInterface.bulkInsert("Certificates", [
      {
        title: "Full Stack Web Development Certification",
        issuer: "Coursera / Meta",
        issueDate: "Dec 2025",
        link: "https://coursera.org",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "PostgreSQL Advanced Database Administration",
        issuer: "Udemy",
        issueDate: "Feb 2026",
        link: "https://udemy.com",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log("✅ Seeded certificates successfully.");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Certificates", null, {});
  },
};
