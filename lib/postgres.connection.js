const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "starc_2",
  password: "rutik",
  port: 5432,
  database: "creto",
});

db.connect().then((done) => console.log("Postgres connect"));

module.exports = db;
