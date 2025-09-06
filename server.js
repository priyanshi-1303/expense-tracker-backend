// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ---------- Middlewares ----------
const corsOptions = {
  origin: "http://localhost:3000", // frontend allowed
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());  // JSON parsing





// ---------- Routes ----------



const expenseRoutes = require('./routes/expenseRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/expenses', expenseRoutes);
app.use('/api/ai', aiRoutes);

// ---------- MongoDB Connection ----------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ---------- Test Route ----------
app.get('/', (req, res) => {
  res.send('API is running');
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
