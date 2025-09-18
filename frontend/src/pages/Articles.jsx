import { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../services/api";
import { useApi } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Articles() {
  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
    refetch,
  } = useApi(() => ApiService.getArticles());

  // Ajout de la récupération des utilisateurs pour le sélecteur
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useApi(() => ApiService.getUsers());

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "", // Initialisé à une chaîne vide, mais sera rempli par le select
  });

  const articles = articlesData?.data || [];
  const users = usersData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createArticle(formData);
      setFormData({ title: "", content: "", userId: "" });
      setShowForm(false);
      refetch(); // Recharger la liste
    } catch (error) {
      alert("Erreur lors de la création: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (articlesLoading || usersLoading) return <LoadingSpinner />;
  if (articlesError || usersError)
    return (
      <ErrorMessage message={articlesError || usersError} onRetry={refetch} />
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📝 Gestion des Articles
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? "Annuler" : "Nouvel Article"}
        </button>
      </div>

      {/* Formulaire de création */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Créer un article</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Remplacement de l'input par un sélecteur d'utilisateurs */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Auteur
              </label>
              <select
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  Sélectionner un auteur
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contenu
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Créer l'article
            </button>
          </form>
        </div>
      )}

      {/* Liste des articles */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Article
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Auteur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {article.content.substring(0, 100)}...
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {article.author.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {article.createdAt}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Voir
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun article trouvé
          </div>
        )}
      </div>
    </div>
  );
}
