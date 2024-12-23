const express = require("express");
const { findAll, save } = require("../controller/UserController");
const router = express.Router();

router.get("/", findAll);
router.post("/", save);

module.exports=router;