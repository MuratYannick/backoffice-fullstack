const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Log des requêtes (middleware custom)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
// Import et montage des routes API
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);
// Route racine
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API BackOffice",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      articles: "/api/articles",
      users: "/api/users",
    },
  });
});
// Middleware de gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée",
    path: req.originalUrl,
  });
});
// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack);
  res.status(500).json({
    success: false,
    message: "Erreur interne du serveur",
  });
});
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Articles: http://localhost:${PORT}/api/articles`);
  console.log(`👥 Users: http://localhost:${PORT}/api/users`);
});
