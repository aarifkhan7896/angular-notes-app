const express = require("express");
const notesController = require("../controller/notesController");
const router = express.Router();

router.route("/notes").get(notesController.read).post(notesController.add);

router
  .route("/notes/:id")
  .delete(notesController.delete)
  .patch(notesController.update);

module.exports = router;
