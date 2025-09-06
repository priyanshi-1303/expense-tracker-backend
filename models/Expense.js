// backend/models/Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Shopping', 'Bills', 'Other'],
    default: 'Other'
  },
  date: {
    type: Date,
    default: Date.now
  },
  // 🔑 Associate expense with a user (store Firebase UID here)
  userId: {
    type: String,
    required: true,
    index: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
