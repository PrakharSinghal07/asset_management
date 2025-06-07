const Book = require("../models/book.model");

const handleCreateBook = async (req, res) => {
  try {
    const bookData = req.body;
    const book = await Book.create(bookData);
    return res.json({ status: "successful", book: book });
  } catch (err) {
    console.error("Error creating book:", err.message);
    if (err.name == "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validation Failed",
        errors: err.errors,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Something went wrong with the server",
    });
  }
};

const handleGetAllBooks = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      year,
      available,
      maxPrice,
      sortParameter = "price",
      sortOrder = "desc",
      page = 1,
      limit = 20,
    } = req.query;
    const filter = {};
    let sort = {};

    if (title) filter.title = title;
    if (author) filter.author = author;
    if (genre) filter.genre = genre;
    if (year) filter.year = year;
    if (available) filter.available = available === "true" ? true : false;
    if (maxPrice) filter.price = { $lt: parseFloat(maxPrice) };

    if (sortParameter == "price")
      sort = { price: sortOrder === "desc" ? -1 : 1 };
    else sort = { year: sortOrder === "desc" ? -1 : 1 };

    const skip = (page - 1) * limit;
    console.log({ ...filter, isDeleted: false });
    const books = await Book.find({ ...filter, isDeleted: false })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json(books);
  } catch (err) {
    console.error(err);
    return res.json({
      status: "error",
      errors: err.errors,
    });
  }
};

const handleGetBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id, isDeleted: false });
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    return res.status(200).json({
      status: "success",
      book: book,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err.errors });
  }
};

const handleUpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        $set: updates,
      },
      { new: true, runValidators: true }
    );
    if (!book) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }
    return res.json({ status: "success", updatedBook: book });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err.errors });
  }
};

const handleDeleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      $set: {
        isDeleted: true,
      },
    }
  );
  if (!book)
    return res.status(404).json({ status: "error", message: "Book not found" });
  return res
    .status(200)
    .json({ status: "Deletion successful", deletedBook: book });
};

module.exports = {
  handleCreateBook,
  handleGetAllBooks,
  handleGetBookById,
  handleUpdateBook,
  handleDeleteBook,
};
