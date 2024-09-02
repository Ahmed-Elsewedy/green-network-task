const { param } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validator')

transactionValidator = [
    param('id')
        .isMongoId().withMessage('Not valid user id'),
    param('book')
        .isMongoId().withMessage('Not valid book id'),
    validatorMiddleware,
]

module.exports = transactionValidator