const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Book = require('../models/book.model');


describe('Books API', () => {
    it('should create a new book', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                title: 'Test Book',
                author: 'Ahmed',
                publishedDate: '2024-01-01',
                isbn: '978-90-274-3964-2',
            });
        expect(response.statusCode).toBe(201);
        expect(response._body.data.title).toBe('Test Book');
        expect(response._body.data.author).toBe('Ahmed');
        expect(response._body.data.isbn).toBe('9789027439642');
    });

    it('should not create a book with duplicate ISBN', async () => {
        await Book.create({
            title: 'Existing Book',
            author: 'Jane Doe',
            publishedDate: '2023-01-01',
            isbn: '9789027439642',
        });

        const response = await request(app)
            .post('/books')
            .send({
                title: 'Another Book',
                author: 'Ahmed Ali',
                publishedDate: '2023-01-01',
                isbn: '9789027439642',
            });
        console.log(response._body);

        expect(response.statusCode).toBe(409);
        expect(response._body.message).toBe('ISBN must be unique');
    });

    it('should retrieve a list of books', async () => {
        await Book.create({
            title: 'Test Book',
            author: 'Ahmed',
            publishedDate: '2023-01-01',
            isbn: '9789027439642',
        });

        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(response._body.data.length).toBeGreaterThan(0);
    });

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
        await Book.deleteMany({});
    });

});
