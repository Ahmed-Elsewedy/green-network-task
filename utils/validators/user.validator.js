const { body, param } = require("express-validator");

const validatorMiddleware = require('../../middlewares/validator')

const createUserValidator = [
    body('name')
        .notEmpty().withMessage('User name is required'),
    body('email')
        .notEmpty().withMessage('User email is required')
        .isEmail().withMessage('Not valid email address'),
    validatorMiddleware,
]

const updateUserValidator = [
    param('id')
        .isMongoId().withMessage('Not valid ID'),
    body('name')
        .optional()
        .notEmpty().withMessage('User name is required'),
    body('email')
        .optional()
        .notEmpty().withMessage('User email is required')
        .isEmail().withMessage('Not valid email address'),
    validatorMiddleware,
]

const deleteUserValidator = [
    param('id')
        .isMongoId().withMessage('Not valid ID'),
    validatorMiddleware,
]

const getUserValidator = [
    param('id')
        .isMongoId().withMessage('Not valid ID'),
    validatorMiddleware,
]

module.exports = {
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    getUserValidator,
}