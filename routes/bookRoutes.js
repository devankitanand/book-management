const express = require('express');
const multer = require('multer');
const { addBooks, getBooksBySeller, updateBook, deleteBook, getAllBooks, getBookById } = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware'); 

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllBooks);
router.get('/book/:id', getBookById);
router.get('/mybooks', verifyToken, getBooksBySeller);
router.post('/upload', verifyToken, upload.single('file'), addBooks);
router.put('/:bookId', verifyToken, updateBook);
router.delete('/:bookId', verifyToken, deleteBook);

module.exports = router;
