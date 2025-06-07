const express = require("express");
const { handleCreateBook, handleGetAllBooks, handleGetBookById, handleUpdateBook, handleDeleteBook } = require("../controllers/book.controller.js");
const router = express.Router();

router.post("/", handleCreateBook);

router.get("/", handleGetAllBooks);

router.get("/:id", handleGetBookById);

router.put("/:id", handleUpdateBook);

router.delete("/:id", handleDeleteBook)
module.exports = router;