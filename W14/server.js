const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

// API to get all users from JSON file
app.get('/api/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});