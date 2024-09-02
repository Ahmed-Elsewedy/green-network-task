const router = require('express').Router()

const bookController = require('../controllers/book.controller')
const {
    createBookValidator,
    updateBookValidator,
    deleteBookValidator,
    getBookValidator,
    searchBookValidator,
} = require('../utils/validators/book.validator')

router.route('/')
    .get(bookController.getAllBooks)
    .post(createBookValidator, bookController.createBook)

router.get('/search', searchBookValidator, bookController.searchBooks)

router.route('/:id')
    .get(getBookValidator, bookController.getBook)
    .patch(updateBookValidator, bookController.updateBook)
    .delete(deleteBookValidator, bookController.deleteBook)

module.exports = router