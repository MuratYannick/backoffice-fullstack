const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
// Middlewares
app.use(cors()); // Autorise les requêtes depuis le frontend
app.use(express.json()); // Parse le JSON des requêtes
// Routes de base
app.get("/", (req, res) => {
  res.json({
    message: "Backend Express opérationnel !",
    timestamp: new Date().toISOString(),
  });
});
// Route de santé pour vérifier que l'API fonctionne
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Backoffice API",
    version: "1.0.0",
  });
});
// Route pour tester la communication avec le frontend
app.get("/api/test", (req, res) => {
  res.json({
    message: "Communication front-back réussie !",
    backend_time: new Date().toISOString(),
    data: {
      framework: "Express.js",
      status: "operational",
    },
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
