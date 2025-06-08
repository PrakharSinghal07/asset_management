require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const connectDB = require("./config/db");
const Book = require("./models/book.model");
const bookRoute = require("./routes/book.js");
const authRoute = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/auth.middleware.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser())
app.use(checkUser);
app.set("view engine", "ejs");
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// app.get("*", checkUser)
app.get("/api/home",requireAuth ,(req, res) => {
  return res.render("home")
})

app.get("/api/home/smoothies",requireAuth ,(req, res) => {
  return res.render("smoothies")
})
app.use("/api/books", bookRoute);
app.use("/api/auth", authRoute);
