const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
var server = http.createServer(app);
var chat = require("./Websocket/chat");
const { Notfoundpag, ErrorHandle } = require("./middleware/ErrorHandling");
const helmet = require("helmet");
const PORT = 5000;
const logger = require("./logger/logger");
const commperssion = require("compression");
const solrClient = require("./lib/solr.connection");

//Middleware
app.use(commperssion());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Individual routes
app.use("/api/v1/auth", require("./routes/apis/auth"));
app.use("/api/v1/user", require("./routes/apis/personalization"));
app.use("/api/v1/message", require("./routes/apis/message"));

app.get("/", async (req, res, next) => {
  logger.info("Request to /hello endpoint");
  res.send("Hello Developers");
});

// Error handling
app.use(ErrorHandle);

// page not found error
app.use(Notfoundpag);

// server run at port
server.listen(PORT, async (err) => {
  if (err) {
    logger.error("error", `Server has not runnig problem ${err}`);
  }
  console.log(`Creto Ready to accept connections on ${PORT}`);
  chat.startSocketServer(server);
});
