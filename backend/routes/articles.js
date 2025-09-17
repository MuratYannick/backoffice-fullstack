const express = require("express");
const { Article, User, Category } = require("../models");
const router = express.Router();
// GET /api/articles - Tous les articles avec relations
router.get("/", async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;

    // Construction des conditions de filtrage
    const where = {};
    if (status) where.status = status;
    if (category) where.categoryId = category;

    // Calcul de la pagination
    const offset = (page - 1) * limit;

    const { count, rows: articles } = await Article.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug", "color"],
        },
      ],
      order: [
        ["publishedAt", "DESC"],
        ["createdAt", "DESC"],
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: articles,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Erreur récupération articles:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// GET /api/articles/:id - Article spécifique avec relations
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug", "color"],
        },
      ],
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article non trouvé",
      });
    }

    // Incrémenter le compteur de vues
    await article.increment("viewCount");

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("Erreur récupération article:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// POST /api/articles - Créer un article
router.post("/", async (req, res) => {
  try {
    const {
      title,
      summary,
      content,
      categoryId,
      userId,
      status = "draft",
    } = req.body;

    // Validation basique
    if (!title || !content || !userId) {
      return res.status(400).json({
        success: false,
        message: "Titre, contenu et auteur requis",
      });
    }

    // Vérification que l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Vérification que la catégorie existe (si fournie)
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Catégorie non trouvée",
        });
      }
    }

    const article = await Article.create({
      title,
      summary,
      content,
      categoryId,
      userId,
      status,
    });

    // Récupération avec relations pour la réponse
    const articleWithRelations = await Article.findByPk(article.id, {
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name", "slug"] },
      ],
    });

    res.status(201).json({
      success: true,
      data: articleWithRelations,
      message: "Article créé avec succès",
    });
  } catch (error) {
    console.error("Erreur création article:", error);

    // Gestion des erreurs de validation Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Erreur de validation",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// PUT /api/articles/:id - Modifier un article
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, categoryId, status } = req.body;

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article non trouvé",
      });
    }

    // Mise à jour
    await article.update({
      title,
      summary,
      content,
      categoryId,
      status,
    });

    // Récupération avec relations
    const updatedArticle = await Article.findByPk(id, {
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name", "slug"] },
      ],
    });

    res.json({
      success: true,
      data: updatedArticle,
      message: "Article modifié avec succès",
    });
  } catch (error) {
    console.error("Erreur modification article:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
// DELETE /api/articles/:id - Supprimer un article
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article non trouvé",
      });
    }

    await article.destroy();

    res.json({
      success: true,
      message: "Article supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression article:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
});
module.exports = router;
