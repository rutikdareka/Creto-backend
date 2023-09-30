const client = require("../lib/redis.connection");

module.exports = {
  getRedisdata: (key) => {
    return new Promise((resolve, reject) => {
      try {
        client
          .get(key)
          .then((done) => {
            resolve(done);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  // getListRedisdata: (key) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       client
  //         .get(key)
  //         .then((done) => {
  //           resolve(done);
  //         })
  //         .catch((err) => {
  //           reject(err);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // },
};
