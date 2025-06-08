const express = require("express");
const {
  handleGetRegisterPage,
  handleGetLoginPage,
  handleUserSignIn,
  handleUserLogIn,
  handleLogOut,
} = require("../controllers/auth.controller.js");


const router = express.Router();

router.get("/register", handleGetRegisterPage);
router.get("/login", handleGetLoginPage);

router.post("/register", handleUserSignIn);
router.post("/login", handleUserLogIn);

router.get("/logout", handleLogOut);
module.exports = router;
