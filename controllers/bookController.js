const Book = require('../models/Book');
const csvParser = require('../utils/csvParser');

const addBooks = (req, res) => {
  const { userId } = req;

  csvParser(req.file.path, (err, books) => {
    if (err) return res.status(500).send(err);

    books.forEach(book => book.seller_id = userId);

    Book.bulkCreate(books, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: 'Books added successfully' });
    });
  });
};

const getBooksBySeller = (req, res) => {
  const { userId } = req;

  Book.findBySellerId(userId, (err, books) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(books);
  });
};

const updateBook = (req, res) => {
  const { userId } = req;
  const { bookId } = req.params;
  const { title, author, price } = req.body;

  Book.findById(bookId, (err, book) => {
    if (err) return res.status(500).send(err);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    if (book.seller_id !== userId) return res.status(403).send({ message: 'Unauthorized' });

    Book.update(bookId, { title, author, price }, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Book updated successfully' });
    });
  });
};

const deleteBook = (req, res) => {
  const { userId } = req;
  const { bookId } = req.params;

  Book.findById(bookId, (err, book) => {
    if (err) return res.status(500).send(err);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    if (book.seller_id !== userId) return res.status(403).send({ message: 'Unauthorized' });

    Book.delete(bookId, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: 'Book deleted successfully' });
    });
  });
};

const getAllBooks = (req, res) => {
  Book.findAll((err, books) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(books);
  });
};

const getBookById = (req, res) => {
  const { bookId } = req.params;

  Book.findById(bookId, (err, book) => {
    if (err) return res.status(500).send(err);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    res.status(200).send(book);
  });
};

module.exports = {
  addBooks,
  getBooksBySeller,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById
};
