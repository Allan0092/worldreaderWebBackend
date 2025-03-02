const express = require("express");
const connectDb = require("./config/db");
const UserRouter = require("./routes/UserRoute");
const BookRouter = require("./routes/BookRoute");
const AuthRouter = require("./routes/AuthRoute");
const cors = require("cors");
const path = require("path");

const app = express();
connectDb();

app.use(cors());
app.use(express.json());
app.use("/file_storage", express.static(path.join(__dirname, "file_storage"))); // Serve static files

app.use("/api/user", UserRouter);
app.use("/api/book", BookRouter);
app.use("/auth", AuthRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
