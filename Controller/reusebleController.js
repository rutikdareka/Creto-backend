const postgressdb = require("../lib/postgres.connection");

module.exports = {
  searchUser: async (req, res) => {
    const searchTerm = req.query.name; // Get the search query parameter

    try {
      if (!searchTerm) {
        return res.send("pls enter query");
      }

      db.query(
        "select * from users where username LIKE $1 or displayname LIKE $1",
        [`%${searchTerm}%`],
        (err, result) => {
          if (err) {
            res.send(err);
          }
          res.status(201).send(result.rows);
        }
      );
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  recentSearchsave: async (req, res) => {
    try {
      const { data } = req.body;

      console.log(req.user, data);

      let requstid = req.user;

      // find recent user
      let findsql = "select * from recents where recentsuserdat->>id = $1";

      const findQuery = await db.query(sql, [data.id]);

      if (findQuery.rows[0]) {
        return res.status(401).send("Already in recents !");
      }

      let insertsql = "insert into recents (id,recentsuserdata) values ($1,$2)";

      const insertQuery = await db.query(insertsql, [requstid, data]);

      res.status(201).send("add recents!");
    } catch (error) {
      return res.send("Not recent search available");
    }
  },

  getrecentsSearchsave: async (req, res) => {
    try {
      let requstid = req.user;

      // get requstid data

      let getsql = "select * from recents where id=$1";

      const findQuery = await db.query(getsql, [requstid]);
      res.send(findQuery.rows);
    } catch (error) {
      return res.status(401).send("Sorry cannot find recents in your ids!");
    }
  },
};
