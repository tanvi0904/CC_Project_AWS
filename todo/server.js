const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'todo_db' // Replace with the name of your MySQL database
});

// Connect to MySQL
db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API endpoint for adding a todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const query = `INSERT INTO todos (text) VALUES (?)`;
  db.query(query, [text], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, text: text, isDone: false });
  });
});

// API endpoint for marking a todo as done
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const query = `UPDATE todos SET isDone = ? WHERE id = ?`;
  db.query(query, [true, id], (err, result) => {
    if (err) throw err;
    res.send({ id: id });
  });
});

// API endpoint for deleting a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM todos WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send({ id: id });
  });
});

// Start the server
const port = 5000; // Replace with the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
