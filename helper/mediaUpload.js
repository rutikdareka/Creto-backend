const {
  CLOUD_NAME,
  API_KEYl,
  API_SECERT,
} = require("./config/dev.enviromental");
const cloudinary = require("cloudinary").v2;

//file_upload__use
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEYl,
  api_secret: API_SECERT,
});
