

const connection = require('../config/db');

const createBookTable = `CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publishedDate DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sellerId INT NOT NULL,
  FOREIGN KEY (sellerId) REFERENCES sellers(id)
)`;

connection.query(createBookTable, (err) => {
  if (err) throw err;
});

const Book = {
  bulkCreate: (books, sellerId, callback) => {
    const sql = 'INSERT INTO books (title, author, publishedDate, price, sellerId) VALUES ?';
    const values = books.map(book => [book.title, book.author, book.publishedDate, book.price, sellerId]);
    connection.query(sql, [values], callback);
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM books';
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  findAllBySellerId: (sellerId) => {
    return new Promise((resolve,reject) => {
      const sql = 'SELECT * FROM books WHERE sellerId = ?';
      connection.query(sql,[sellerId],(err,results)=>{
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });

    });
    
  },
  findById: (bookid) => {
    return new Promise((resolve,reject)=>{
      const sql = 'SELECT * FROM books WHERE id = ?';
      connection.query(sql,[bookid],(err,results)=>{
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }
  
  ,
  findByIdAndSellerId: (bookId, sellerId, callback) => {
    const sql = 'SELECT * FROM books WHERE id = ? AND sellerId = ?';
    connection.query(sql, [bookId, sellerId], callback);
  },
  update: (bookId, sellerId, updatedBook, callback) => {
    const sql = 'UPDATE books SET ? WHERE id = ? AND sellerId = ?';
    connection.query(sql, [updatedBook, bookId, sellerId], callback);
  },
  delete: (bookId, sellerId, callback) => {
    const sql = 'DELETE FROM books WHERE id = ? AND sellerId = ?';
    connection.query(sql, [bookId, sellerId], callback);
  }
};

module.exports = Book;
