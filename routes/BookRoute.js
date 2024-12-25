const express = require("express");
const { findAll, save, findById, deleteById, update } = require("../controller/BookController");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file_storage');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

const router = express.Router();

router.get("/", findAll);
router.post("/", upload.single('file'), save);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.post("/:id", update);

module.exports=router;