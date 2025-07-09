# WorldReader - Backend

## Overview

The backend for the WorldReader Application is built with Node.js and MongoDB. It provides a robust API for managing users, books, authentication, and various other features for a digital library platform.

## Features

### API Endpoints

#### **User API**

- `GET /api/user/` - Get all users (Admin only)
- `POST /api/user/` - Register a new user
- `GET /api/user/:id` - Get user by ID
- `PUT /api/user/:id` - Update user information
- `DELETE /api/user/:id` - Delete user (Admin only)
- `POST /api/user/login` - User login
- `POST /api/user/findByEmail` - Get user details by email
- `POST /api/user/addToLibrary` - Add book to user's library
- `POST /api/user/removeFromLibrary` - Remove book from user's library
- `GET /api/user/library/:userId` - Get user's library

#### **Book API**

- `GET /api/book/` - Get all books
- `POST /api/book/` - Add a new book (with file upload)
- `GET /api/book/:id` - Get book by ID
- `PUT /api/book/:id` - Update book information
- `DELETE /api/book/:id` - Delete book

#### **Authentication API**

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Authentication & Authorization

- **JWT-based Authentication** - Secure token-based authentication system
- **Role-based Access Control** - Different permissions for Admin and User roles
- **Token Validation** - Middleware for protecting routes
- **Password Hashing** - bcrypt for secure password storage

### File Management

- **File Upload** - Support for PDF and ePub book uploads using Multer
- **Cover Generation** - Automatic PDF cover extraction using pdf-poppler
- **File Storage** - Organized file storage system

## Technologies

### Backend

- **Node.js** - Server-side runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data management
- **Mongoose** - Object Data Modeling (ODM) library

### Authentication & Security

- **jsonwebtoken** - JWT implementation
- **bcryptjs** - Password hashing
- **Express middleware** - Custom authentication and authorization

### File Processing

- **Multer** - File upload handling
- **pdf-poppler** - PDF processing and cover extraction
- **Path & FS** - File system operations

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd worldreaderWebBackend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:

   ```env
   MONGODB_URI=mongodb://localhost:27017/db_worldreader
   SECRET_KEY=your_secret_key_here
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## Project Structure

```
worldreaderWebBackend/
├── controller/
│   ├── AuthController.js
│   ├── BookController.js
│   └── UserController.js
├── model/
│   ├── Book.js
│   ├── Credential.js
│   └── User.js
├── routes/
│   ├── AuthRoute.js
│   ├── BookRoute.js
│   └── UserRoute.js
├── security/
│   └── Auth.js
├── validation/
│   ├── BookValidation.js
│   └── UserValidation.js
├── file_storage/
│   └── covers/
├── app.js
└── README.md
```

## API Usage Examples

### User Registration

```javascript
POST /api/user/
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "country": "USA"
}
```

### User Login

```javascript
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Add Book (with file upload)

```javascript
POST /api/book/
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "title": "Sample Book",
  "author": "author_id",
  "isbn": "1234567890",
  "contentType": "PDF",
  "file": <file_upload>
}
```

### Authenticated Request

```javascript
GET /api/user/
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- JWT token expiration (1 hour)
- Password hashing with bcrypt
- Role-based route protection
- Input validation
- Error handling without exposing sensitive information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Author

**Allan Gautam**

---

For any questions or issues, please contact the project maintainer.
