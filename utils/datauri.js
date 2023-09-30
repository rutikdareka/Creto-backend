const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getdatauri = (file) => {
  const parser = new DataUriParser();
  const extname = path.extname(file?.originalname).toString();
  console.log(extname);
  return parser.format(extname, file.buffer);
};

module.exports = getdatauri;
