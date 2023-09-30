var socket = require("socket.io");
let io;

const users = new Map();

module.exports = {
  startSocketServer: function (app) {
    io = socket(app, {
      cors: {
        origin: "http://localhost:3000",
        credential: true,
      },
    });

    if (io) {
      console.log("Websocket server start!");
    }

    // io.on("connection", (socket) => {
    //   console.log("connect");
    //   // socket.on("add-user", (id) => {
    //   //   if (!users.some((user) => user.userid === id)) {
    //   //     users.push({ userid: id, socketid: socket.id });
    //   //   }
    //   //   io.emit("get-users", users);
    //   // });

    //   // socket.on("typing", async (e) => {
    //   //   let data = e;
    //   //   const finduser = users.find((items) => items.userid === data.id);
    //   //   socket.broadcast.emit("show-user-typing", data);
    //   // });

    //   // socket.on("stop_typing", (data) => {
    //   //   const finduser = users.find((items) => items.userid === data.id);
    //   //   socket.broadcast.emit("stop_user_typing", data);
    //   // });

    //   socket.on("disconnect", () => {
    //     users = users.filter((items) => {
    //       return items.socketid !== socket.id;
    //     });
    //     io.emit("get-users", users);
    //   });
    // });
  },
};
