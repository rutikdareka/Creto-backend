const multer = require("multer");

const storage = multer.memoryStorage();

const uploadfile = multer({ storage: storage }).array("files");

module.exports = uploadfile;
