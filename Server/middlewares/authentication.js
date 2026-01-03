const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const token = req.headers.access_token;
    const verify = verifyToken(token);
    if (!verify || !token) {
      throw { message: "Unauthenticated" };
    }
    const user = await User.findByPk(verify.id);
    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    console.log(error);
    if (error.message === "Unauthenticated") {
      res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
    
  }
}

module.exports = { authentication };
