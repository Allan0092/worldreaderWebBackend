const express=require("express")
const connectDb=require("./config/db")
const UserRouter=require("./routes/UserRoute")
const BookRouter=require("./routes/BookRoute")
const app=express();

connectDb();

app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/book", BookRouter);

PORT = 5000
app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`);
});