var jwt = require("jsonwebtoken");
const { JSON_WEB_SECRET } = require("../config/dev.enviromental");
const SECRET = JSON_WEB_SECRET;

// Genrate token
function Genrate(id) {
  const token = jwt.sign(id, SECRET);
  return token;
}

// verify token
function verifyToken(key) {
  const checktoken = jwt.verify(key, SECRET);
  return checktoken;
}

module.exports = { Genrate, verifyToken };
