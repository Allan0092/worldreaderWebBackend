const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = require("../security/Auth");
const Book = require("../model/Book");

const addToLibrary = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "User ID and Book ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!user.library.includes(bookId)) {
      user.library.push(bookId);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Book added to library", library: user.library });
  } catch (e) {
    console.error("Add to library error:", e);
    res.status(500).json({ error: e.message });
  }
};

const removeFromLibrary = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "User ID and Book ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.library = user.library.filter((id) => id.toString() !== bookId);
    await user.save();

    res
      .status(200)
      .json({ message: "Book removed from library", library: user.library });
  } catch (e) {
    console.error("Remove from library error:", e);
    res.status(500).json({ error: e.message });
  }
};

const getLibrary = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate(
      "library",
      "title coverURL contentURL"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.library);
  } catch (e) {
    console.error("Get library error:", e);
    res.status(500).json({ error: e.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};

const save = async (req, res) => {
  try {
    let user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    return res.status(201).send("User Registered successfully");
  } catch (e) {
    if (e.code === 11000) {
      // when email already exists
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(500).json(e.toString());
  }
};

const findById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};

const deleteById = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser) {
      return res.status(200).json("User account deleted successfully");
    } else {
      return res.status(404).json("User not found");
    }
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};

const update = async (req, res) => {
  let id;
  try {
    // let user = await User.findById(req.params.id);
    // if (!user){
    //     return res.status(404).json("User not found");
    // }
    // if (req.body.resetPassword){ // when user has changed their password
    //     req.body.password = await bcrypt.hash(req.body.password, 10);
    // }
    if (req.body.password)
      req.body.password = await bcrypt.hash(req.body.password, 10);
    try {
      const email = req.body.email;
      const user = await User.findOne({ email });
      id = user.id;
    } catch (e) {
      console.log(e.toString());
      return res.status(404).json("User not found");
    }

    update_user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(201).json("User data updated successfully");
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).send("Invalid email or password");
    }
    // const token = jwt.sign({email:user.email, id:user.id}, SECRET_KEY, {expiresIn: '1h'});
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getUserDetailsbyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      country: user.country,
    });
  } catch (e) {
    res.status(500).json(e.toString());
  }
};

const imageUpload = async (req, res) => {
  try {
    // // check for the file size and send an error message
    // if (req.file.size > process.env.MAX_FILE_UPLOAD) {
    //   return res.status(400).send({
    //     message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
    //   });
    // }

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file" });
    }
    res.status(200).json({
      success: true,
      data: req.file.filename,
    });
  } catch (e) {
    res.status(500).json(e.toString());
  }
};

module.exports = {
  findAll,
  save,
  findById,
  deleteById,
  update,
  login_user,
  getUserDetailsbyEmail,
  imageUpload,
  addToLibrary,
  removeFromLibrary,
  getLibrary,
};
