const { createClient } = require("redis");

const client = createClient();

//Connect to Redis
client.on("error", function (err) {
  console.log("Not connecting for redis");
});

client.on("connect", function (done) {
  console.log("Redis connected");
});

client.connect();

module.exports = client;
