const mongoose = require("mongoose");
const {isEmail} = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [6, 'Minimum password length is 6 characters']
  },
});
