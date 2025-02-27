const express = require("express");
const {
  findAll,
  save,
  findById,
  deleteById,
  update,
} = require("../controller/BookController");
const multer = require("multer");
const BookValidation = require("../validation/BookValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./file_storage");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}).single("file");

const router = express.Router();

router.get("/", findAll);
router.post("/", upload, BookValidation, save); // Reordered: upload first, then validate
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.post("/:id", update);

module.exports = router;
