// frontend/src/service/api.js

const API_BASE_URL = "http://localhost:3000/api";
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur API");
      }

      return data;
    } catch (error) {
      console.error("Erreur API:", error);
      throw error;
    }
  }

  // Articles
  async getArticles() {
    return this.request("/articles");
  }

  async getArticle(id) {
    return this.request(`/articles/${id}`);
  }

  async createArticle(articleData) {
    return this.request("/articles", {
      method: "POST",
      body: JSON.stringify(articleData),
    });
  }

  // Users
  async getUsers() {
    return this.request("/users");
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }
}
export default new ApiService();
