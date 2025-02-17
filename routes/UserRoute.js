const express = require("express");
const {
  findAll,
  save,
  findById,
  deleteById,
  update,
  login_user,
  getUserDetailsbyEmail,
  imageUpload,
} = require("../controller/UserController");
const UserValidation = require("../validation/UserValidation");
const { authenticateToken, authorizeRole } = require("../security/Auth");
const upload = require("../controller/fileUpload");
const router = express.Router();

router.get("/", authenticateToken, authorizeRole("Admin"), findAll);
router.post("/", UserValidation, save);
router.post("/login", login_user);
router.post("/findByEmail", authenticateToken, getUserDetailsbyEmail);
router.get("/:id", findById);
router.delete("/:id", authenticateToken, authorizeRole("Admin"), deleteById);
router.post("/update", authenticateToken, update);
router.post("/imageUpload", upload, imageUpload);

module.exports = router;
