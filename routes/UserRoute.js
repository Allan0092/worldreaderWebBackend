const express = require("express");
const {
  findAll,
  save,
  findById,
  deleteById,
  update,
  login_user,
  getUserDetailsbyEmail,
} = require("../controller/UserController");
const UserValidation = require("../validation/UserValidation");
const { authenticateToken, authorizeRole } = require("../security/Auth");
const router = express.Router();

router.get("/", authenticateToken, authorizeRole("Admin"), findAll);
router.post("/", UserValidation, save);
router.post("/login", login_user);
router.post("/findByEmail", authenticateToken, getUserDetailsbyEmail);
router.get("/:id", findById);
router.delete("/:id", authenticateToken, authorizeRole("Admin"), deleteById);
router.post("/:id", authenticateToken, update);

module.exports = router;
