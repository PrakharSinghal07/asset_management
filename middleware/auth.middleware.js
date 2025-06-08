const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "book manager secret", (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.redirect("/api/auth/login");
      }
      else{
        next();
      }
    });
  }
  else{
    return res.redirect("/api/auth/login");
  }
  
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, 'book manager secret', async(err, decodedToken) => {
      if(err){
        res.locals.user = null;
        next();
      }
      else{
        let user = await User.findById(decodedToken.id);
        res.locals.user = user
        next();
      }
    })
  }
  else{
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };
