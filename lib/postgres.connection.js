const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
// const db = require("../db");

// console.log(db);

const {
  POSTGRESS_HOST,
  POSTGRESS_USER,
  POSTGRESS_PASSWORD,
  POSTGRESS_PORT,
  POSTGRESS_DATABASE,
} = require("../config/dev.enviromental");
const logger = require("../logger/logger");

const postgressdb = new Client({
  host: POSTGRESS_HOST,
  user: POSTGRESS_USER,
  password: POSTGRESS_PASSWORD,
  port: POSTGRESS_PORT,
  database: POSTGRESS_DATABASE,
});

postgressdb.connect((err, done) => {
  if (err) {
    logger.error("errro", `Postgress has not connecting problem ${err}`);
  } else {
    console.log("postgressql connected");
  }
});

(async function () {
  let getconnectpath = path.join(__dirname, "..", "db");
  try {
    const files = fs.readdirSync(getconnectpath);
    await Promise.all(
      files.forEach(async (file) => {
        const filenamepath = path.join(getconnectpath, file);

        if (path.extname(filenamepath) === ".sql") {
          try {
            const sqlfile = fs.readFileSync(filenamepath, "utf-8");
            await postgressdb.query(sqlfile);
            logger.info("success sql create table");
          } catch (error) {
            logger.error(error);
          }
        }
      })
    );
  } catch (error) {
    logger.error(error);
  }
})();

module.exports = postgressdb;
