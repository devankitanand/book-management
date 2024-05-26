const express = require('express');
const { addBooks, getBooksBySeller, updateBook, deleteBook, getAllBooks, getBookById } = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', verifyToken, upload.single('file'), addBooks);
router.get('/seller', verifyToken, getBooksBySeller);
router.put('/:bookId', verifyToken, updateBook);
router.delete('/:bookId', verifyToken, deleteBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBookById);

module.exports = router;
