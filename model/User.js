const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date },
  Country: { type: String, default: "Nepal" },
  registrationDate: { type: Date, default: Date.now },
  verificationStatus: { type: Boolean, default: false }, // For user verification
  profilePicture: { type: String, default: "./default_pic.jpg" },
  activated: { type: Boolean, default: true }, // false if deleted account
  library: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
