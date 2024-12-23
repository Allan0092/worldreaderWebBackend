const mongoose = require('mongoose');

const bookLibrarySchema = new mongoose.Schema({
    library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    progress: { type: Number, default: 0 }
});

const BookLibrary = mongoose.model('BookLibrary', bookLibrarySchema);

module.exports = BookLibrary;