// backend/routes/index.js

const express = require("express");
const router = express.Router();
// Import des routes spécifiques
const articlesRoutes = require("./articles");
const usersRoutes = require("./users");
// Montage des routes
router.use("/articles", articlesRoutes);
router.use("/users", usersRoutes);
// Route de santé pour l'API
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API opérationnelle",
    timestamp: new Date().toISOString(),
    endpoints: {
      articles: "/api/articles",
      users: "/api/users",
    },
  });
});
module.exports = router;
