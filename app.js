// imports
const mongoose = require("mongoose");
const express = require("express");
const carRouter = require("./router/carRouter");
const userRouter = require("./router/userRouter");
const app = express();
const cookieParser=require("cookie-parser");
app.use(cookieParser(), (req, res, next) => {
  // console.log(req.cookies.jwt);
  next();
});
// Middle ware
const DB =
  "mongodb+srv://thealpher:123abc@cluster1-ig5en.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(conn => {
    // console.log(conn.connection);
    console.log("Connected to DB");
  });
app.use(express.json());
app.use("/", carRouter);
app.use("/api/user",userRouter);
app.use(express.static("public"));
app.set("view engine", "pug");

// views folder
app.set("views", "template");

module.exports = app;
