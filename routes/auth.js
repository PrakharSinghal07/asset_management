const express = require("express");
const {handleUserSignIn, handleUserLogIn} = 
const router = express.Router();

router.post("/register", handleUserSignIn);
router.post("/login", handleUserLogIn);


module.exports = router;