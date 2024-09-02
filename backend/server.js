const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');
const todoRoutes = require('./todo');
const authenticate = require('./authenticate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticate, todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));