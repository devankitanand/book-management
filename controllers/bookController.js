const Book = require('../models/Book');
const csvParser = require('../utils/csvParser');


const addBooks = async (req, res) => {
  const { userId } = req;
  const { userRole } = req;

  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
if (userRole !== 'seller') {
    return res.status(403).send({ message: 'Only Seller can Upload books' });
  }
  try {
    const books = await new Promise((resolve, reject) => {
      csvParser(req.file.path, (err, books) => {
        if (err) reject(err);
        else resolve(books);
      });
    });

    books.forEach(book => book.seller_id = userId);

    const result = await Book.bulkCreate(books, userId);

    res.status(201).send({ message: 'Books added successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getBooksBySeller = async (req, res) => {
  const { userId } = req;

  try {
    const books = await Book.findBySellerId(userId);
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateBook = async (req, res) => {
  const { userId } = req;
  const { bookId } = req.params;
  const { title, author, price } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    if (book.seller_id !== userId) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    await Book.update(bookId, { title, author, price });
    res.status(200).send({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteBook = async (req, res) => {
  const { userId } = req;
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    if (book.seller_id !== userId) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    await Book.delete(bookId);
    res.status(200).send({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getBookById = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  addBooks,
  getBooksBySeller,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById
};

