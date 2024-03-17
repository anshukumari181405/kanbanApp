const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/kanbanDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('Error connecting to MongoDB:', err));
