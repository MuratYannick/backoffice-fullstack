function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          🚀 Frontend Ready!
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Technologies utilisées :</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              React 18
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Vite (Build tool)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Tailwind CSS
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App