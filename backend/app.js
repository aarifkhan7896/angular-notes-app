const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const notesController = require("./controller/notesController");

mongoose
  .connect("mongodb://localhost:27017/userNotes")
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.route("/api/notes").get(notesController.read).post(notesController.add);

app
  .route("/api/notes/:id")
  .delete(notesController.delete)
  .patch(notesController.update);

module.exports = app;
