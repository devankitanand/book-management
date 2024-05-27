const connection = require('../config/db');

const createSellerTable = `CREATE TABLE IF NOT EXISTS sellers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
)`;

connection.query(createSellerTable, (err) => {
  if (err) throw err;
});

const Seller = {
  create: (seller, callback) => {
    const sql = 'INSERT INTO sellers SET ?';
    connection.query(sql, seller, callback);
  },
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM sellers WHERE email = ?';
    connection.query(sql, [email], callback);
  }
};

module.exports = Seller;

