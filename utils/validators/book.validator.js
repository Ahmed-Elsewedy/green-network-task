const { body, param, query } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validator')

const normalizeISBN = (isbn) => {
    return isbn.replace(/[\s-]+/g, '')
}

const createBookValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be more than 3 characters'),
    body('author')
        .notEmpty().withMessage('Author is required')
        .isLength({ min: 2, max: 100 }).withMessage('Author must be between 2 and 100 characters long'),
    body('publishedDate')
        .notEmpty().withMessage('published Date is required')
        .isISO8601().withMessage('published Date must be a valid date'),
    body('isbn')
        .notEmpty().withMessage('ISBN is required')
        .isISBN().withMessage('Not valid ISBN'),
    body('availableCopies')
        .optional()
        .isInt({ min: 1 }).withMessage('Available copies must more than 0'),
    validatorMiddleware,
    (req, res, next) => {
        req.body.isbn = normalizeISBN(req.body.isbn)
        next()
    }
]

const updateBookValidator = [
    param('id')
        .isMongoId().withMessage('Invalid ID fromat'),
    body('title')
        .optional()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters long'),
    body('author')
        .optional()
        .notEmpty().withMessage('Author cannot be empty')
        .isLength({ min: 2, max: 100 }).withMessage('Author must be between 2 and 100 characters long'),
    body('publicationDate')
        .optional()
        .isISO8601().withMessage('Publication Date must be a valid date'),
    body('isbn')
        .optional()
        .isISBN().withMessage('Not valid ISBN'),
    body('availableCopies')
        .optional()
        .isInt({ min: 1 }).withMessage('Available copies must be more than 0'),
    validatorMiddleware,
    (req, res, next) => {
        if (req.body.isbn) {
            req.body.isbn = normalizeISBN(req.body.isbn)
        }
        next()
    }
]

const deleteBookValidator = [
    param('id')
        .isMongoId().withMessage('Invalid ID fromat'),
    validatorMiddleware
]

const getBookValidator = [
    param('id')
        .isMongoId().withMessage('Invalid ID fromat'),
    validatorMiddleware
]

const searchBookValidator = [
    query('isbn')
        .optional()
        .isISBN().withMessage('Not valid ISBN'),
    validatorMiddleware,
    (req, res, next) => {
        if (req.body.isbn)
            req.body.isbn = normalizeISBN(req.body.isbn)
        next()
    },
]

module.exports = {
    createBookValidator,
    updateBookValidator,
    deleteBookValidator,
    getBookValidator,
    searchBookValidator,
}