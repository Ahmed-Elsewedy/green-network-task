const User = require("../models/user.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

createUser = asyncWrapper(async (req, res, next) => {
    const existUser = await User.findOne({ email: req.body.email })
    if (existUser) {
        const error = appError.create('Email must be unique', 409, httpStatusText.FAIL)
        return next(error)
    }
    const user = new User(req.body)
    await user.save()

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: user,
    })
})

updateUser = asyncWrapper(async (req, res, next) => {
    const id = req.params.id
    const email = req.body.email

    const currentUser = await User.findById(id)
    if (!currentUser) {
        const error = appError.create('User not found.', 404, httpStatusText.FAIL)
        return next(error)
    }

    if (email && email !== currentUser.email) {
        const existUser = await User.findOne({ email })
        if (existUser) {
            const error = appError.create('This email exists for another user.', 409, httpStatusText.FAIL)
            return next(error)
        }
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: user,
    })
})

deleteUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error)
    }
    res.json({
        status: httpStatusText.SUCCESS,
        message: 'User deleted successfully',
    })
})

getAllUsers = asyncWrapper(async (req, res) => {
    const limit = req.query.limit || 50
    const page = req.query.page || 1
    const skip = limit * (page - 1)

    const users = await User.find({}, { __v: false }).limit(limit).skip(skip)
    res.json({
        status: httpStatusText.SUCCESS,
        data: users,
    })
})

getUser = asyncWrapper(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error)
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: user,
    })

})

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser,
};
