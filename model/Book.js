const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isbn: { type: String, unique: true },
  publicationDate: { type: Date, default: Date.now },
  contentType: { type: String, enum: ["PDF", "ePub"], required: true },
  contentURL: { type: String, required: true },
  verifiedStatus: { type: Boolean, default: false },
  coverURL: { type: String }, // New field for cover image
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
