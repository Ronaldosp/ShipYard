const jwt = require("jsonwebtoken")
const JWT_SECRET = "secret";

const signToken = (payload) =>{
    return jwt.sign(payload,JWT_SECRET)
}

const verifyToken = (verify) =>{
    return jwt.verify(verify,JWT_SECRET)
}

module.exports = { signToken , verifyToken };