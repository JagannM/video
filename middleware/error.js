const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).send("Something Failed. Db not connected");
};

//this middleware handles the rejected promises error
