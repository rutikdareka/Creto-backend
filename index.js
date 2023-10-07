const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const http = require("http");
var server = http.createServer(app);
const morgan = require("morgan");
var chat = require("./Websocket/chat");
const { Notfoundpag, ErrorHandle } = require("./middleware/ErrorHandling");
const WebSocket = require("ws");
const helmet = require("helmet");
const PORT = process.env.PORT || 3000;
const accessLogStream = fs.createWriteStream("./access.log", { flags: "a" });

//Middleware
app.use(cors());
app.use(helmet());
// app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Individual routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/user", require("./routes/personalization"));
app.use("/api/v1/message", require("./routes/message"));

app.get("/", async (req, res, next) => {
  res.send("Hello Developers");
});

// Error handling
app.use(ErrorHandle);

// page not found error
app.use(Notfoundpag);

// server run at port
server.listen(PORT, async (err, done) => {
  if (err) {
    console.log(err);
  }
  console.log(`Creto Ready to accept connections on ${PORT}`);
  chat.startSocketServer(server);
});
