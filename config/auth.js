const jwt = require("jsonwebtoken");
require("dotenv").config()

const config = process.env;

const verifyToken = (req, res, next) => {
  const bearerHeader =req.headers["authorization"];
    //req.body.token || req.query.token || req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const bearer = bearerHeader.split(' ')
        const token = bearer[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.payload)
    req.user = decoded.payload;
    
    
    
    //req.user._id = user._id
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
