const winston = require("winston");
require("winston-mongodb");
const error = require("./middleware/error.js");
const config = require("config");
const mongoose = require("mongoose");
const customers = require("./routes/customer_route.js");
const genres = require("./routes/genres_route.js");
const movies = require("./routes/movies_route.js");
const rentals = require("./routes/rentals_route.js");
const users = require("./routes/users_route.js");
const auth = require("./routes/auth.js");
const express = require("express");
const app = express();
const Joi = require("joi");

process.on('uncaughtException',(ex)=>{
  console.log('WE GOT AN UNCAUGHT EXCEPTION');
  winston.error(ex.message,ex);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/video",
    collection: "log",
  })
);

throw new Errror('Something failed during startup');

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1); //0 means success
}

mongoose
  .connect("mongodb://localhost/video")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/customers", customers);
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
