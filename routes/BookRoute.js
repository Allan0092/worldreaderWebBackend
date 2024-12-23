const express = require("express");
const { findAll, save, findById, deleteById, update } = require("../controller/BookController");
const router = express.Router();

router.get("/", findAll);
router.post("/", save);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.post("/:id", update);

module.exports=router;