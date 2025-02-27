const Book = require("../model/Book");
const User = require("../model/User"); // Ensure this is imported

const save = async (req, res) => {
  try {
    const { title, author, isbn, publicationDate, contentType } = req.body;
    const file = req.file;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", file);

    if (!title || !author || !file) {
      return res
        .status(400)
        .json({ message: "Title, author, and file are required" });
    }

    const user = await User.findOne({ _id: author });
    if (!user) {
      return res.status(400).json({ message: "Author not found" });
    }

    const book = new Book({
      title,
      author: user._id,
      isbn,
      publicationDate: publicationDate || new Date(),
      contentType,
      contentURL: file.path,
    });

    console.log("Book to save:", book);
    const savedBook = await book.save();
    console.log("Saved book:", savedBook);

    res.status(201).json(savedBook);
  } catch (e) {
    console.error("Save error:", e);
    res.status(500).json({ error: e.message });
  }
};
const findAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const findById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const update = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(201).json(book);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { findAll, save, findById, deleteById, update };
