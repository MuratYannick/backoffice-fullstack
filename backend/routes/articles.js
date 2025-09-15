const express = require("express");
const router = express.Router();
// Données temporaires (remplacées par BDD plus tard)
let articles = [
  {
    id: 1,
    title: "Introduction à React",
    content: "React est une bibliothèque JavaScript...",
    author: "John Doe",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Express.js pour les débutants",
    content: "Express est un framework web pour Node.js...",
    author: "Jane Smith",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    title: "Bases de données avec MySQL",
    content: "MySQL est un système de gestion de base de données...",
    author: "Bob Wilson",
    createdAt: "2024-01-17",
  },
];
// GET /api/articles - Récupérer tous les articles
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: articles,
      count: articles.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// GET /api/articles/:id - Récupérer un article spécifique
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = articles.find((a) => a.id === id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article non trouvé",
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// POST /api/articles - Créer un nouvel article
router.post("/", (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validation basique
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "Titre, contenu et auteur requis",
      });
    }

    const newArticle = {
      id: Math.max(...articles.map((a) => a.id)) + 1,
      title,
      content,
      author,
      createdAt: new Date().toISOString().split("T")[0],
    };

    articles.push(newArticle);

    res.status(201).json({
      success: true,
      data: newArticle,
      message: "Article créé avec succès",
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
