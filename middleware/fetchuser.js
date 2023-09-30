var jwt = require("jsonwebtoken");
const SECRET = "Rutik@goodboy$123";
const verifyToken = require("../helper/jsonToken.auth");

const fetchuser = (req, res, next) => {
  try {
    const key = req.header("auth-token");
    if (!key) {
      return res.send("please authontication valid token");
    }

    // verify for token check
    const decode = verifyToken(key);

    // verify user id get
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = fetchuser;
