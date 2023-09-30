// Custome Error handling for Middelware
module.exports = {
  ErrorHandle: (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.send({
      success: false,
      status: errStatus,
      message: errMsg,
    });
  },

  // catch error handler
  Catcherrorhandle: (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },

  // page not found error
  Notfoundpag: (req, res, next) => {
    const error = new Error("Requested api not found!");
    error.status = 404;
    res.send({
      success: false,
      status: error.status,
      message: "Requested api not found!",
    });
  },
};
