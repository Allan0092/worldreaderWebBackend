const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isbn: { type: String, unique: true },
    publicationDate: { type: Date },
    contentType: { type: String, enum: ['PDF', 'ePub'], required: true },
    contentURL: { type: String, required: true },
    verifiedStatus: { type: Boolean, default: false }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;