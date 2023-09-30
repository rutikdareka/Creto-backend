const express = require("express");
const {
  googlelogin,
  loginuser,
  signupnuser,
  sendmail,
  forgotPassword,
  verifyopt,
  resendapi,
  Onetapgooglelogin,
} = require("../Controller/authController");
const router = express.Router();

/**
 * Login a user.
 * @method Post
 * @param {string} req.body.email - The username of the user.
 * @param {string} req.body.password - The password of the user.
 * @returns {object} An object containing the user's authentication status.
 */
router.post("/login", loginuser);

/**
 * signup a user.
 * @method Post
 * @param {string} req.body.alldata.
 * @returns {object} An object containing the user's authentication status.
 */
router.post("/signup", signupnuser);

/**
 * @method Post
 * @param {string} req.body.email
 */
router.post("/sendlink", sendmail);

/**
 * @method Post
 * @param {string} req.body.password - The new password of the user.
 */
router.post("/forgotPassword/:id/:token", forgotPassword);

/**
 * @method Post
 * @param {string} req.body.otp
 */
router.post("/verifyotp", verifyopt);

/**
 * @method Post
 * @param {string} req.body.otp
 */
router.post("/resend/:id", resendapi);

/**
 * @method Post
 * @param {string} req.body.googledata
 @returns {object} An object containing the user's authentication status. 
*/
router.post("/google-login", googlelogin);

/**
 * @method Post
 * @param {string} req.body.googledata 
  @returns {object} An object containing the user's authentication status.
*/
router.post("/onetap-google-login", Onetapgooglelogin);

module.exports = router;
