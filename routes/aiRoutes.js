// backend/routes/aiRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const ML_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

// POST /api/ai/predict    -> forwards to ML /predict
router.post("/predict", async (req, res) => {
  try {
    const resp = await axios.post(`${ML_URL}/predict`, req.body, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000
    });
    return res.json(resp.data);
  } catch (err) {
    console.error("AI predict error:", err.message || err);
    return res.status(502).json({ error: "AI predict failed", details: err.message });
  }
});

// GET /api/ai/predict_future -> forwards to ML /predict_future
router.get("/predict_future", async (req, res) => {
  try {
    const resp = await axios.get(`${ML_URL}/predict_future`, { timeout: 10000 });
    return res.json(resp.data);
  } catch (err) {
    console.error("AI predict_future error:", err.message || err);
    return res.status(502).json({ error: "AI future prediction failed", details: err.message });
  }
});

// POST /api/ai/analyze -> forwards to ML /analyze
router.post("/analyze", async (req, res) => {
  try {
    const resp = await axios.post(`${ML_URL}/analyze`, req.body, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000
    });
    return res.json(resp.data);
  } catch (err) {
    console.error("AI analyze error:", err.message || err);
    return res.status(502).json({ error: "AI analyze failed", details: err.message });
  }
});

module.exports = router;
