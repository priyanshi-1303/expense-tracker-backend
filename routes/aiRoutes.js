const express = require("express");
const router = express.Router();
const axios = require("axios");

// Flask base URL
const FLASK_URL = "http://127.0.0.1:5001";

// Category Prediction
router.post("/predict", async (req, res) => {
  try {
    const { title } = req.body;
    const aiRes = await axios.post(`${FLASK_URL}/predict`, { title });
    res.json(aiRes.data);
  } catch (err) {
    console.error("❌ AI Predict Error:", err.message);
    res.status(500).json({ error: "AI service failed" });
  }
});

// Future Spending Prediction
router.get("/predict_future", async (req, res) => {
  try {
    const aiRes = await axios.get(`${FLASK_URL}/predict_future`);
    res.json(aiRes.data);
  } catch (err) {
    console.error("❌ AI Future Error:", err.message);
    res.status(500).json({ error: "AI service failed" });
  }
});

// Anomaly Detection
router.post("/analyze", async (req, res) => {
  try {
    const { category, current_spend } = req.body;
    const aiRes = await axios.post(`${FLASK_URL}/analyze`, { category, current_spend });
    res.json(aiRes.data);
  } catch (err) {
    console.error("❌ AI Analyze Error:", err.message);
    res.status(500).json({ error: "AI service failed" });
  }
});

module.exports = router;
