const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const uploadfile = require("../middleware/multer");
const {
  CreateProfile,
  getProfileuser,
} = require("../Controller/userController");

router.post("/createProfile", uploadfile, CreateProfile);
router.get("/getProfile", fetchuser, getProfileuser);

module.exports = router;
