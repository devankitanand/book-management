const connection = require('../config/db');

const createBookTable = `CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  seller_id INT,
  FOREIGN KEY (seller_id) REFERENCES sellers(id)
)`;

connection.query(createBookTable, (err) => {
  if (err) throw err;
});

const Book = {
  bulkCreate: (books, callback) => {
    const sql = 'INSERT INTO books (title, author, price, seller_id) VALUES ?';
    const values = books.map(book => [book.title, book.author, book.price, book.seller_id]);
    connection.query(sql, [values], callback);
  },
  findBySellerId: (sellerId, callback) => {
    const sql = 'SELECT * FROM books WHERE seller_id = ?';
    connection.query(sql, [sellerId], callback);
  },
  findAll: (callback) => {
    const sql = 'SELECT * FROM books';
    connection.query(sql, callback);
  },
  findById: (bookId, callback) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    connection.query(sql, [bookId], callback);
  },
  update: (bookId, updatedBook, callback) => {
    const sql = 'UPDATE books SET ? WHERE id = ?';
    connection.query(sql, [updatedBook, bookId], callback);
  },
  delete: (bookId, callback) => {
    const sql = 'DELETE FROM books WHERE id = ?';
    connection.query(sql, [bookId], callback);
  }
};

module.exports = Book;
