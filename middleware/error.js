module.exports = function (err, req, res, next) {
  res.status(500).send("Something Failed. Db not connected");
};

//this middleware handles the rejected promises error
