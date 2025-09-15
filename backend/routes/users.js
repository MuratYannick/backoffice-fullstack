const express = require("express");
const router = express.Router();
// Données temporaires
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "editor",
    createdAt: "2024-01-12",
  },
];
// GET /api/users - Récupérer tous les utilisateurs
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// GET /api/users/:id - Récupérer un utilisateur spécifique
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
module.exports = router;
