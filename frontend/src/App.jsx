// frontend/src/App.jsx

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Users from "./pages/Users";
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="py-8 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
