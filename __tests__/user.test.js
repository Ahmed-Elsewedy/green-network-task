const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/user.model');

describe('Users API', () => {

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'Ahmed Elsewedy',
                email: 'ahmed@mail.com',
            });

        expect(response.statusCode).toBe(201);
        expect(response._body.data.name).toBe('Ahmed Elsewedy');
    });

    it('should not create a user with duplicate email', async () => {
        await User.create({
            name: 'Ahmed',
            email: 'ahmed@email.com',
        });

        const response = await request(app)
            .post('/users')
            .send({
                name: 'Ahmed',
                email: 'ahmed@email.com',
            });

        expect(response.statusCode).toBe(409);
        expect(response._body.message).toBe('Email must be unique');
    });

    it('should retrieve a list of users', async () => {
        await User.create({
            name: 'Ahmed Elsewedy',
            email: 'ahmed@email.com',
        });

        const response = await request(app).get('/users');
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
        await User.deleteMany({});
    });
});
