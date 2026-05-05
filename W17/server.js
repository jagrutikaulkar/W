const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

// API to get all employees from JSON file
app.get('/api/employees', (req, res) => {
  const employees = JSON.parse(fs.readFileSync('employees.json', 'utf8'));
  res.json(employees);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});