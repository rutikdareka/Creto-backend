const postgressdb = require("../lib/postgres.connection");
const logger = require("../logger/logger");

class postgressserivces {
  constructor(quries, value, schema) {
    this.quries = quries;
    this.value = value;
    this.schema = schema;
  }

  // let get data in postgressql
  async getdatapostgress() {
    try {
    } catch (error) {
      logger.error(error);
    }
  }

  // let insert data in postgressql
  async insertdatapostgress() {
    try {
      let insertQurie = `insert into ${this.schema} ${this.value} values ($${this.value.length}) RETURNING *`;
      const insertdata = await postgressdb.query(insertQurie, [this.value]);
      return insertdata;
    } catch (error) {
      logger.error("error", `not insert data in postgressql error ${error}`);
    }
  }

  // let update data in postgressql
  async updatedatapostgress() {
    try {
    } catch (error) {
      logger.error("error", `not update data in postgressql error ${error}`);
    }
  }

  // let delete data in postgressql
  async deletedatapostgress() {
    try {
    } catch (error) {
      logger.error("error", `not delete data in postgressql error ${error}`);
    }
  }
}

module.exports = { postgressserivces };
