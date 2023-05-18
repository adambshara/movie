const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vid")
  .then(() => console.log("Connected to Mongodb..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
// const genres = [
//   { id: 1, genre: "horror" },
//   { id: 2, genre: "action" },
//   { id: 3, genre: "thriller" },
// ];

// app.get("/api/genres", (req, res) => {
//   res.send(genres);
// });

// app.post("/api/genres", (req, res) => {
//   const { error } = validateCourse(req.body); //result.error
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }
//   const genre = {
//     id: genres.length + 1,
//     genre: req.body.genre,
//   };
//   genres.push(genre);
//   res.send(genre);
// });
// //validation function
// function validateCourse(genre) {
//   const schema = {
//     genre: Joi.string().min(3).required(),
//   };
//   return Joi.validate(genre, schema);
// }
//Update
// app.put("/api/genres/:id", (req, res) => {
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   if (!genre)
//     res.status(404).send("The course with the given ID was not found");
//   const { error } = validateCourse(req.body); //result.error
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }
//   //update course
//   genre.name = req.body.name;
//   //Return the updated course
//   res.send(genre);
// });
// app.delete("/api/genres/:id", (req, res) => {
//   const genre = genres.find((c) => c.id === parseInt(req.params.id));
//   if (!genre)
//     res.status(404).send("The course with the given ID was not found");

//   //Delete
//   const index = genres.indexOf(genre);
//   genres.splice(index, 1);

//   //Return the same course
//   res.send(genre);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
