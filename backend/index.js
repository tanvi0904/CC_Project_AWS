const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const db = mysql.createPool({
  host: 'ccdatabase.c95irdynjpct.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'database',
  database: 'CCdatabase'
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const corsOptions = {
  origin: ['http://54.189.145.65', 'http://54.189.145.65:81'],
  methods: ['POST','GET'],
  allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/insert', (req, res) => {
  const sqlinsert = 'INSERT INTO todolist (listname,completion) VALUES (?,0)';
  db.query(sqlinsert, [req.body.listname], (err, result) => {
    console.log(req.body.listname);
  });
});

app.post('/api/update', (req, res) => {
  const sqlupd = 'UPDATE todolist SET completion=1 WHERE listname=?';
  db.query(sqlupd, [req.body.listname], (err, result) => {
    console.log(req.body.listname);
  });
});

app.post('/api/remove', (req, res) => {
  const sqlupd = 'DELETE from todolist WHERE listname=?';
  db.query(sqlupd, [req.body.listname], (err, result) => {
    console.log(req.body.listname);
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
