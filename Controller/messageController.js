const client = require("../lib/redis.connection");
const db = require("../lib/postgres.connection");

module.exports = {
  /**
   * @param {Request} {req}
   */
  createchat: async (req, res) => {
    try {
      const { contact } = req.query;

      if (!req.user || !contact) {
        return res.send("Pls auth-token required");
      }

      if (contact === req.user) {
        return res.send("Not creation in you");
      }

      let findsql =
        "select * from contacts where (creater = $1 and adduser= $2)";
      let findQuery = await db.query(findsql, [req.user, contact]);

      if (findQuery.rows[0]) {
        return res.send("Conversation Already Exist");
      }

      let sql =
        "INSERT INTO contacts (creater,adduser,createdchat) VALUES ($1,$2,$3) RETURNING *";

      let date = new Date();

      const insertQuery = await db.query(sql, [req.user, contact, date]);

      res.send({
        message: "Chat created successfuly!",
        data: insertQuery.rows[0],
      });
    } catch (error) {
      res.status(401).send("Intervel server error");
    }
  },

  /**
   * @getchat {Request} {req.user}
   */
  getcontact: async (req, res) => {
    try {
      let sql =
        "select * from contacts where creater=$1 order by createdchat desc";

      const findQuery = await db.query(sql, [req.user]);

      let data = [];

      for (let index = 0; index < findQuery.rows.length; index++) {
        // find the second user in database
        let sql = "select * from users where id=$1";

        let finduserdata = await db.query(sql, [findQuery.rows[index].adduser]);
        // console.log(finduserdata.rows)
        let obj = {
          user: finduserdata.rows[0],
          lastmessage: findQuery.rows[index].lastmessage,
        };
        data.push(obj);
      }
      // console.log(data)
      res.send(data);
    } catch (error) {
      res.status(401).send("Some error occured");
    }
  },

  /**
   * @deletecontact {req.body}
   */
  deletecontact: async (req, res) => {
    try {
      const { deletedId } = req.body;
      let sql = "delete from contacts where adduser=$1";

      const DeleteQuery = await db.query(sql, [deletedId]);

      res.send(DeleteQuery);
    } catch (error) {
      res.status(401).send("Some error occured");
    }
  },

  // Messaging APIS

  /**
   * @creteMessage {req.body}
   */
  createMessage: async (req, res) => {
    try {
      const { user, sender, receiver, message } = req.body;

      // user send message and another user create a chat logic

      const findsql = "select * from contacts where (creater=$1)";
      const findQuery = await db.query(findsql, [receiver]);
      const find1sql = "select * from contacts where (adduser=$1)";
      const find1Query = await db.query(findsql, [receiver]);

      if (findQuery.rows.length > 0 && findQuery.rows.length > 0) {
        let newDate = new Date();

        let sql =
          "INSERT INTO messages (sender,receiver,message,createdmsg,userdata) VALUES ($1,$2,$3,$4,$5) RETURNING *";
        const insertQuery = await db.query(sql, [
          sender,
          receiver,
          message,
          newDate,
          user,
        ]);

        // inserted to lasmessage users
        let checksql =
          "select * from contacts where (creater = $1 and adduser = $2) or (creater = $2 and adduser = $1)";
        const checkdb = await db.query(checksql, [sender, receiver]);

        if (checkdb.rows.length > 0) {
          let obj = {
            sender: sender,
            lastMessage: message,
          };
          let insersql =
            "update contacts set lastmessage=$3 where (creater = $1 and adduser = $2) or (creater = $2 and adduser = $1)";
          const insertEle = await db.query(insersql, [sender, receiver, obj]);
        }

        res.status(201).json({
          success: "Message Send Successfuly !",
          data: insertQuery.rows,
        });
      } else {
        let newDate = new Date();
        const createsql =
          "INSERT INTO contacts (creater,adduser,createdchat) VALUES ($1,$2,$3)";
        const insertQuery = await db.query(createsql, [
          receiver,
          sender.id,
          newDate,
        ]);

        // inserted to lasmessage users
        let checksql =
          "select * from contacts where (creater = $1 and adduser = $2) or (creater = $2 and adduser = $1)";
        const checkdb = await db.query(checksql, [sender, receiver]);

        if (checkdb.rows.length > 0) {
          let obj = {
            sender: sender,
            lastMessage: message,
          };
          let insersql =
            "update contacts set lastmessage=$3 where (creater = $1 and adduser = $2) or (creater = $2 and adduser = $1)";
          const insertEle = await db.query(insersql, [sender, receiver, obj]);
        }

        if (insertQuery.rows.length > 0) {
          let newDate = new Date();

          let sql =
            "INSERT INTO messages (sender,receiver,message,createdmsg,userdata) VALUES ($1,$2,$3,$4,$5)";
          const insertQuery = await db.query(sql, [
            sender,
            receiver,
            message,
            newDate,
            user,
          ]);

          res.status(201).json({
            success: "Message Send Successfuly !",
            data: insertQuery.rows,
          });
        }
      }
    } catch (error) {
      return res.status(401).send("Problem for message Sending");
    }
  },

  /**
   * @param {req.query}
   */
  getMessage: async (req, res, next) => {
    try {
      const { user1, user2 } = req.query;

      console.log(user1, user2);

      let sql =
        "select * from messages where (sender = $1 and receiver = $2) or (sender = $2 and receiver = $1)";

      const findQuery = await db.query(sql, [user1, user2]);

      const allmessages = findQuery.rows.map((items) => {
        let obj = {
          avatar: items?.userdata.avatar,
          id: items?.userdata.id,
        };
        return {
          myself: items.sender === user1,
          message: items.message,
          user: obj,
        };
      });

      await Promise.all(allmessages);
      res.send(allmessages);
    } catch (error) {
      return next(error);
    }
  },
};
