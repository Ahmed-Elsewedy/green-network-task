const User = require("../models/user.model")
const Book = require("../models/book.model")
const asyncWrapper = require("../middlewares/asyncWrapper")
const appError = require("../utils/appError")
const httpStatusText = require("../utils/httpStatusText")

borrowBook = asyncWrapper(async (req, res, next) => {
    const { id, book: bookId } = req.params

    const user = await User.findById(id)
    if (!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error)
    }

    if (user.borrowedBooks.length === 2) {
        const error = appError.create('User has max 2 books to borrow.', 409, httpStatusText.FAIL)
        return next(error)
    }

    // check availability of book
    const book = await Book.findById(bookId)
    if (!book) {
        const error = appError.create('Book not found.', 404, httpStatusText.FAIL)
        return next(error)
    }

    if (book.availableCopies === 0) {
        const error = appError.create('This book not available now.', 404, httpStatusText.FAIL)
        return next(error)
    }

    // check if borrowed previous
    if (user.borrowedBooks.includes(bookId)) {
        const error = appError.create('User borrowed this book before.', 404, httpStatusText.FAIL)
        return next(error)
    }

    // borrow book
    book.availableCopies--
    user.borrowedBooks.push(bookId)
    await book.save()
    await user.save()
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: 'Book borrowed successfully',
    });
})

returnBook = asyncWrapper(async (req, res, next) => {
    const { id, book: bookId } = req.params

    const user = await User.findById(id)
    if (!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error)
    }

    // check availability of book
    const book = await Book.findById(bookId)
    if (!book || book.availableCopies === 0) {
        const error = appError.create('Book not found', 404, httpStatusText.FAIL)
        return next(error)
    }

    // check if not borrowed previous
    if (!user.borrowedBooks.includes(bookId)) {
        const error = appError.create('User not borrowed this book.', 404, httpStatusText.FAIL)
        return next(error)
    }

    // return book
    book.availableCopies++
    user.borrowedBooks.remove(bookId)
    await book.save()
    await user.save()
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: 'Book returned successfully',
    });
})

module.exports = {
    borrowBook,
    returnBook,
}