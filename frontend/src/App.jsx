import { useState, useEffect } from "react";

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    // test de communication avec le backend
    fetch("http://localhost:3000/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBackendData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cente mb-8 text-blue-600">
          🚀 Full-Stack Application!
        </h1>
        {/* Status Frontend */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            ✅ Frontend opérationnel
          </h2>
          <p className="text-gray-600">React + Vite + Tailwind CSS</p>
        </div>

        {/* Status Backend */}
        <div className="bg-white p-6 rouded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            🔗 Communication Backend
          </h2>

          {loading && (
            <div className=" text-blue-500">Test de connexion...</div>
          )}

          {error && (
            <div className="text-red-500 bg-red50 p-4 rounded">
              ❌ Erreur: {error}
            </div>
          )}

          {backendData && (
            <div className="text-green-600 bg-green-50 p-4 roundded">
              ✅ Backend connecté !
              <div className="mt-2 text-sm text-gray-600">
                <strong>Message:</strong> {backendData.message}<br/>
                <strong>Heure Backend:</strong> {backendData.backend_time}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
