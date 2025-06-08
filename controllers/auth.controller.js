const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
  let errors = { email: "", password: "" };

  // if (err.code == 11000) {
  //   errors.email = "The email is already registered";
  // }
  console.log(err.errors);
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  const token = jwt.sign({ id }, "book manager secret", {
    expiresIn: maxAge,
  });
  return token;
};

const handleGetLoginPage = async (req, res) => {
  return res.render("login");
};

const handleGetRegisterPage = async (req, res) => {
  return res.render("signup");
};

const handleUserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.json({ status: "Signed up successfully", user: user });
  } catch (err) {
    const errors = handleError(err);
    return res.status(400).json({ errors: errors });
  }
};

const handleUserLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const token = createToken(user._id);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.json({ status: "Logged in successfully", user: user });
      } else {
        return res.json({
          status: "error",
          errors: { email: "", password: "invalid credentials" },
        });
      }
    }
    return res.json({
      status: "error",
      errors: { email: "", password: "invalid credentials" },
    });
  } catch (err) {
    console.log(err);
  }
};

const handleLogOut = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect("/api/auth/login");
}
module.exports = {
  handleUserSignIn,
  handleUserLogIn,
  handleGetLoginPage,
  handleGetRegisterPage,
  handleLogOut,
};
