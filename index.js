const express = require('express');
const app = express();
const port = 3000;

// Load data
const users = require('./data.json');

// Middleware to parse JSON
app.use(express.json());

// Middleware example: check for custom API key header
app.use((req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== 'secret123') {
    return res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
  }
  next();
});

// 1. Get all users with optional filters, sorting, pagination
// Example: GET /users?role=admin&sort=age&limit=2&page=1
app.get('/users', (req, res) => {
  let result = [...users];

  // Filtering by role
  if (req.query.role) {
    result = result.filter(user => user.role === req.query.role);
  }

  // Filtering by minAge & maxAge
  if (req.query.minAge) {
    const minAge = parseInt(req.query.minAge);
    result = result.filter(user => user.age >= minAge);
  }
  if (req.query.maxAge) {
    const maxAge = parseInt(req.query.maxAge);
    result = result.filter(user => user.age <= maxAge);
  }

  // Sorting
  if (req.query.sort) {
    const sortKey = req.query.sort;
    const order = req.query.order === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1 * order;
      if (a[sortKey] > b[sortKey]) return 1 * order;
      return 0;
    });
  }

  // Pagination
  const limit = parseInt(req.query.limit) || result.length;
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResult = result.slice(startIndex, endIndex);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginatedResult
  });
});

// 2. Get a single user by ID (URL param)
// Example: GET /users/3
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
