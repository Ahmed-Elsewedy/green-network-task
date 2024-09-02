const Book = require("../models/book.model")
const asyncWrapper = require("../middlewares/asyncWrapper")
const appError = require("../utils/appError")
const httpStatusText = require("../utils/httpStatusText")

createBook = asyncWrapper(async (req, res, next) => {

    const existingBook = await Book.findOne({ isbn: req.body.isbn })
    if (existingBook) {
        const error = appError.create('ISBN must be unique', 409, httpStatusText.FAIL)
        return next(error)
    }

    const book = new Book(req.body)
    await book.save()
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: book,
    })
})

updateBook = asyncWrapper(async (req, res, next) => {
    const id = req.params.id
    const isbn = req.body.isbn

    const currentBook = await Book.findById(id)
    if (!currentBook) {
        const error = appError.create('Book not found.', 404, httpStatusText.FAIL)
        return next(error)
    }

    if (isbn && isbn !== currentBook.isbn) {
        const existingBook = await Book.findOne({ isbn })
        if (existingBook) {
            const error = appError.create('This ISBN exists for another book.', 409, httpStatusText.FAIL)
            return next(error)
        }
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: book,
    })
})

deleteBook = asyncWrapper(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
        const error = appError.create('Book not found', 404, httpStatusText.FAIL)
        return next(error)
    }
    res.json({
        status: httpStatusText.SUCCESS,
        message: 'Book deleted successfully',
    })
})

getAllBooks = asyncWrapper(async (req, res, next) => {

    const limit = req.query.limit || 50
    const page = req.query.page || 1
    const skip = limit * (page - 1)

    const books = await Book.find({}, { __v: false }).limit(limit).skip(skip)
    res.json({
        status: httpStatusText.SUCCESS,
        data: books,
    })
})

getBook = asyncWrapper(async (req, res, next) => {
    const book = await Book.findById(req.params.id)
    if (!book) {
        const error = appError.create('Book not found', 404, httpStatusText.FAIL)
        return next(error)
    }
    res.json({
        status: httpStatusText.SUCCESS,
        data: book,
    })
})

searchBooks = asyncWrapper(async (req, res, next) => {
    const { query } = req
    const limit = query.limit || 50
    const page = query.page || 1
    const skip = limit * (page - 1)

    const books = await Book.find({
        $or: [
            { title: { $regex: query.title, $options: 'i' } },
            { isbn: query.isbn },
        ]
    }).limit(limit).skip(skip)

    if (!books) {
        const error = appError.create('No books match title or isbn', 404, httpStatusText.FAIL)
        return next(error)
    }

    res.json({
        status: httpStatusText.SUCCESS,
        data: books,
    })
})

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getBook,
    searchBooks,
}