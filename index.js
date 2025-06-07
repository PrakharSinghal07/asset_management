require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const connectDB = require("./config/db");
const Book = require("./models/book.model");
const bookRoute = require("./routes/book.js");
const authRoute = require("./routes/auth.js");
const app = express();


app.use(express.json());
app.use(express.urlencoded());

connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log(err);
})


app.use("/api/books", bookRoute);
app.use("/api/auth", authRoute);

