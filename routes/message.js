const express = require("express");
const {
  createchat,
  deletecontact,
  getcontact,
  getMessage,
  createMessage,
} = require("../Controller/messageController");
const fetchuser = require("../middleware/fetchuser");
const {
  searchUser,
  recentSearchsave,
  getrecentsSearchsave,
} = require("../Controller/reusebleController");
const { Catcherrorhandle } = require("../middleware/ErrorHandling");
const router = express.Router();

// searching messages api

/**
 * @param {string} req.body.keyword - user search database
   @returns {object} An object containing the user's authentication status.
*/
router.get("/search-user", searchUser);
router.post("/add-recents", fetchuser, recentSearchsave);
router.get("/get-recents", fetchuser, getrecentsSearchsave);

// Create chats with user API

/**
 * @method Get
 * @param {string} req.body.addcontact - add new user chat
 */
router.get("/acsess-contact", fetchuser, createchat);

/**
 * @method Get
 * @param {string} req.body.ids - get two conversations
 */
router.get("/get-contact", fetchuser, getcontact);

/**
 * @method Post
 * @param {string} req.body.deleteid - delete cconversation
 */
router.post("/delete-contact", fetchuser, deletecontact);

// Messages with user API

/**
 * @method Post
 * @param {string} req.body.messagedata - add message and send message user
  @returns {object} An object containing the user's authentication status.
*/
router.post("/createMsg", createMessage);

/**
 * @method Get
 * @param {string} req.body.getMessageids - get exist conversations chat
   @returns {object} An object containing the user's authentication status.
*/
router.get("/getMsg", fetchuser, getMessage);

module.exports = router;
