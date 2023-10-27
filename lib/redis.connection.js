const { createClient } = require("redis");
const { REDIS_HOST, REDIS_PORT } = require("../config/dev.enviromental");
const logger = require("../logger/logger");

const client = createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

//Connect to Redis
client.on("error", function (err) {
  logger.error("error", `Redis has not conneted ${err}`);
});

client.on("connect", function (done) {
  console.log("Redis connected");
});

// connect request
client.connect();

module.exports = client;
