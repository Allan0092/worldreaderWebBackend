const Book = require("../model/Book");
const User = require("../model/User");
const path = require("path");
const pdfPoppler = require("pdf-poppler");
const fs = require("fs").promises;

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

    let coverPath = null;
    try {
      const pdfPath = file.path;
      const coverDir = "./file_storage/covers";
      const coverPrefix = path.basename(pdfPath, ".pdf");
      const expectedCoverFileName = `${coverPrefix}-001.jpg`;
      coverPath = path.join(coverDir, expectedCoverFileName);

      console.log("Generating cover at:", coverPath);
      await pdfPoppler.convert(pdfPath, {
        format: "jpeg",
        out_dir: coverDir,
        out_prefix: coverPrefix,
        page: 1,
      });

      await fs.access(coverPath);
      book.coverURL = coverPath;
    } catch (coverError) {
      console.error("Cover extraction error:", coverError);
    }

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

const findAllPublic = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author", "first_name last_name verificationStatus")
      .select("title coverURL author verifiedStatus");

    const booksWithAuthorName = books.map((book) => ({
      _id: book._id,
      title: book.title,
      coverURL: book.coverURL,
      author: book.author
        ? `${book.author.first_name || ""} ${
            book.author.last_name || ""
          }`.trim()
        : "Unknown",
      verifiedStatus: book.author?.verificationStatus || false,
    }));

    res.status(200).json(booksWithAuthorName);
  } catch (e) {
    console.error("Find all public error:", e);
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

const findBooksWithCountries = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author", "Country") // Fetch author's Country field
      .select("title author");

    const booksWithCountries = books.map((book) => ({
      _id: book._id,
      title: book.title,
      country: book.author?.Country || "Unknown",
    }));

    res.status(200).json(booksWithCountries);
  } catch (e) {
    console.error("Find books with countries error:", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  findAll,
  save,
  findById,
  deleteById,
  update,
  findAllPublic,
  findBooksWithCountries, // Export new function
};
