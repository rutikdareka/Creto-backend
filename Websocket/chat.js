var socket = require("socket.io");
let io;

let users = [];

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

    /**
     *  @param @adduser
     */
    io.on("connection", (socket) => {
      socket.on("add-user", (id) => {
        if (!users.some((user) => user.userid === id)) {
          users.push({ userid: id, socketid: socket.id });
        }
        io.emit("get-users", users);
      });

      /**
       *  @param @id
       */

      socket.on("typing", async (e) => {
        let data = e;
        socket.broadcast.emit("show-user-typing", data);
      });

      /**
       *  @param @data
       */

      socket.on("stop_typing", (data) => {
        socket.broadcast.emit("stop_user_typing", data);
      });

      /**
       *  @param @deleteuser
       */

      socket.on("disconnect", () => {
        users = users.filter((items) => {
          return items.socketid !== socket.id;
        });
        io.emit("get-users", users);
      });
    });
  },
};
