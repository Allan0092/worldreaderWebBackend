const express = require("express");
const { findAll, save, findById, deleteById, update } = require("../controller/UserController");
const UserValidation = require("../validation/UserValidation");
const { authenticateToken, authorizeRole } = require("../security/Auth");
const router = express.Router();

router.get("/", authenticateToken, authorizeRole("Admin"), findAll);
router.post("/", UserValidation,save);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.post("/:id", update);

module.exports=router;