// require("express-async-errors");
// const winston = require("winston");
// require("winston-mongodb");
// const error = require("./middleware/error");
// const config = require("config");
// const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// Joi.objectId = require("joi-objectid")(Joi);
// const mongoose = require("mongoose");
// const genres = require("./routes/genres");
// const customers = require("./routes/customers");
// const movies = require("./routes/movies");
// const rentals = require("./routes/rentals");
// const users = require("./routes/users");
// const auth = require("./routes/auth");
// const express = require("express");

// const app = express();

// process.on("uncaughtException",(ex)=>{
//   console.log("WE GOT AN EXCEPTION");
//winston.error(ex.message,ex);
// })

// winston.add(winston.transports.File, { filename: "logfile.log" });
// winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vid" });

// if (!config.get("jwtPrivateKey")) {
//   console.log("Fatal ERROR: jwtPrivateKey is not defined.");
//   process.exit(1);
// }

// mongoose
//   .connect("mongodb://localhost/vid")
//   .then(() => console.log("Connected to Mongodb..."))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));

// app.use(express.json());
// app.use("/api/genres", genres);
// app.use("/api/customers", customers);
// app.use("/api/movies", movies);
// app.use("/api/rentals", rentals);
// app.use("/api/users", users);
// app.use("/api/auth", auth);
// app.use(error);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`));
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
module.exports = server;
