const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse JSON requests

// Sample routes
app.get("/", (req, res) => {
  res.json({
    message: "Backend Express is running!",
    timestamp: new Date().toISOString(),
  });
});

// Health check route for API monitoring
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Backoffice API",
    version: "1.0.0",
  });
});

// test route for frontend communication
app.get("/api/test", (req, res) => {
  res.json({
    message: "Communication front-back works!",
    backendTime: new Date().toISOString(),
    data: {
      framwork: "Express.js",
      status: "operational",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server start on http://localhost:${PORT}`);
});
