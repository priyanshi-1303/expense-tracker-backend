const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

// 🟢 Get all expenses for a specific user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Add a new expense for a user
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    const expense = new Expense({ title, amount, category, userId });
    await expense.save();

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
