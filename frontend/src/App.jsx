import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import Users from "./pages/Users.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="py-8 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
