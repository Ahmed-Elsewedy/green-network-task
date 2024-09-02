# Technical Task Green Network

## Description

A brief description of what your project does and its purpose. For example:

This project is an API for managing a book collection and user accounts. It allows users to create, update, delete, and retrieve books and user profiles. Additionally, users can borrow and return books.

## Features

- Manage books (CRUD operations)
- Search books
- Manage users (CRUD operations)
- Borrow and return books
- Swagger API documentation

## Technologies

- Node.js
- Express
- MongoDB
- Jest (for testing)
- Supertest (for testing)

## Installation

Follow these steps to get your development environment set up.

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Ahmed-Elsewedy/green-network-task.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd green-network-task
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file** in the root directory and add the following environment variables (adjust values as needed):

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/green_network_task
    ```

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

   The server will start on `http://localhost:3000`.

2. **Access API Documentation:**

   Visit `http://localhost:3000/api-docs` to view and interact with the API documentation provided by Swagger.

## Running Tests

1. **Run tests:**

    ```bash
    npm test
    ```

   This will run the tests using Jest and Supertest.

2. **View test coverage:**

   If you have configured coverage reporting in Jest, you can view the coverage report after running tests:

    ```bash
    npm test -- --coverage
    ```

## API Endpoints

### Books

- **GET /books**: Retrieve a list of all books.
- **POST /books**: Create a new book.
- **GET /books/:id**: Retrieve a book by ID.
- **PATCH /books/:id**: Update a book by ID.
- **DELETE /books/:id**: Delete a book by ID.
- **GET /books/search**: Search for books.

### Users

- **GET /users**: Retrieve a list of all users.
- **POST /users**: create new user.
- **GET /users/:id**: Retrieve a user by ID.
- **PATCH /users/:id**: Update a user by ID.
- **DELETE /users/:id**: Delete a user by ID.

### Borrow/Return
- **POST /users/:id/borrow/bookId**: Borrow a book.
- **POST /users/:id/return/bookId**: Return a borrowed book.



## Acknowledgments

- [Express](https://expressjs.com/) for the web framework.
- [MongoDB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/) for database management.
- [Swagger](https://swagger.io/) for API documentation.
- [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) for testing.

