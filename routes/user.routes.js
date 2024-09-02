const router = require('express').Router()

const userController = require('../controllers/user.controller')
const transactionController = require('../controllers/transaction.controller')

const {
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    getUserValidator,
} = require('../utils/validators/user.validator')

const transactionValidator = require('../utils/validators/transaction.validator')

router.route('/')
    .post(createUserValidator, userController.createUser)
    .get(userController.getAllUsers)

router.route('/:id')
    .get(getUserValidator, userController.getUser)
    .patch(updateUserValidator, userController.updateUser)
    .delete(deleteUserValidator, userController.deleteUser)

router.post('/:id/borrow/:book', transactionValidator, transactionController.borrowBook)
router.post('/:id/return/:book', transactionValidator, transactionController.returnBook)

module.exports = router