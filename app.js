const express=require("express")
const connectDb=require("./config/db")

const app=express();

connectDb();

app.listen(5000, () =>{
    console.log("Server started at http://localhost:5000 hello");
});