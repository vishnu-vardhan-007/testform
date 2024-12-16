const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost', // Your Workbench host
  user: 'root', // Your MySQL username
  password: '180904', // Your MySQL password
  database: 'emp', // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to add an employee
app.post('/employees', (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  const sql = 'INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, employeeId, email, phone, department, dateOfJoining, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ error: 'Failed to add employee' });
    } else {
      res.status(200).send({ message: 'Employee added successfully', result });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
