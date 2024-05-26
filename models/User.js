const connection = require('../config/db');

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
)`;

connection.query(createUserTable, (err) => {
  if (err) throw err;
  console.log("Users table created or already exists.");
});

const User = {
  create: (user, callback) => {
    const sql = 'INSERT INTO users SET ?';
    connection.query(sql, user, callback);
  },
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], callback);
  }
};

module.exports = User;
