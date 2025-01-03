const express = require("express");
const {login, register} = require("../controller/AuthController");
const { authenticateToken } = require("../security/Auth");
const router = express.Router();

router.post("/login", login);
router.post("/register",authenticateToken, register);

module.exports = router;