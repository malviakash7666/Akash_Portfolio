"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./src/database/models");

const app = express();

// =======================
// Middlewares
// =======================

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://akashhotteok-00bf0e.netlify.app"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// =======================
// Health Route
// =======================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Server Running 🚀",
    environment: process.env.NODE_ENV,
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/api/portfolio", async (req, res, next) => {
  try {
    const [admin, skills, projects, experiences] = await Promise.all([
      db.User.findOne({
        where: { role: "admin" },
        attributes: ["name", "bio", "heroDescription", "profileImage", "resumeUrl", "socialLinks"],
      }),
      db.Skill.findAll({ order: [["id", "ASC"]] }),
      db.Project.findAll({ order: [["id", "DESC"]] }),
      db.Experience.findAll({ order: [["id", "DESC"]] }),
    ]);

    return res.status(200).json({
      success: true,
      profile: admin || null,
      skills: skills || [],
      projects: projects || [],
      experience: experiences || [],
      experiences: experiences || [],
      education: [],
    });
  } catch (error) {
    next(error);
  }
});

// =======================
// Routes
// =======================

app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/skills", require("./src/routes/skill.routes"));
app.use("/api/projects", require("./src/routes/project.routes"));
app.use("/api/experiences", require("./src/routes/experience.routes"));
app.use("/api/certificates", require("./src/routes/certificate.routes"));
app.use("/api/upload", require("./src/routes/upload.routes"));

// =======================
// 404 Handler
// =======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =======================
// Global Error Handler
// =======================

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =======================
// Server Start
// =======================

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();

    console.log("✅ Database connected successfully");

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);

      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);

    process.exit(1);
  }
};

// =======================
// Graceful Shutdown
// =======================

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Closing server...`);

  try {
    if (server) {
      server.close(() => {
        console.log("🛑 HTTP server closed");
      });
    }

    await db.sequelize.close();

    console.log("🔌 Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error.message);

    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("SIGINT", () => shutdown("SIGINT"));

// Start Application

startServer();
