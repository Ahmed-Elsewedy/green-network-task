const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/user.model');
const Book = require('../models/book.model');


describe('Transaction API', () => {
    it('Borrow Book', async () => {

        const user = await User.create({
            name: 'Test User',
            email: 'test@email.com',
        })

        const book = await Book.create({
            title: 'Test Book',
            author: 'Ahmed',
            publishedDate: '2024-01-01',
            isbn: '978-90-274-3964-2',
        })

        const response = await request(app)
            .post(`/users/${user._id}/borrow/${book._id}`)
            .send({});

        expect(response.statusCode).toBe(201);
        expect(response._body.message).toBe('Book borrowed successfully');
    });

    it('Return Book', async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'test@email.com',
        })

        const book = await Book.create({
            title: 'Test Book',
            author: 'Ahmed',
            publishedDate: '2024-01-01',
            isbn: '978-90-274-3964-2',
        })
        user.borrowedBooks.push(book._id)
        await user.save()

        const response = await request(app)
            .post(`/users/${user._id}/return/${book._id}`)
            .send({});

        expect(response.statusCode).toBe(201);
        expect(response._body.message).toBe('Book returned successfully');
    })

    beforeAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        await mongoose.connect('mongodb://localhost:27017/green_test');

    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
        await Book.deleteMany({});
    });
});
