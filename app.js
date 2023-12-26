const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'mysql-36e54173-mulberrydatabase.a.aivencloud.com',
    port: 24400,
    user: 'avnadmin',
    password: 'AVNS_PXPi8DwKVq_UOKMdt1m',
    database: 'defaultdb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Example route
// Example route
app.get('/values', (req, res) => {
    const { option, value } = req.query;
    
    const query = `SELECT * FROM example WHERE ${option} = ?`;
  
    connection.query(query, [value], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send({ error: 'Internal Server Error' });
        return;
      }
  
      // Handle the results as needed
      res.send({ message: `Received option: ${option} and ${value}`, results });
    });
  });

  // Example route
app.post('/add-value', (req, res) => {
    const value = req.body;
  
    // Check if the password starts with a certain predefined letter like "qwerty"
    if (value.password && value.password.startsWith('qwerty')) {
      // Allow modification to the database;
      
      // If some fields aren't filled, set them to null during upload
      const query = 'INSERT INTO mulbery (column1, column2, column3) VALUES (?, ?, ?)';
      const valuesToInsert = [value.column1, value.column2, value.column3]; // Adjust these based on your actual column names
      
      connection.query(query, valuesToInsert, (err, results) => {
        if (err) {
          console.error('Error adding values to the database:', err);
          res.status(500).send({ error: 'Internal Server Error' });
          return;
        }
  
        res.send({ message: 'Values added successfully', results });
      });
    } else {
      // Password doesn't meet the condition, deny modification
      res.status(403).send({ error: 'Unauthorized' });
    }
  });
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
