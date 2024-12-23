const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;