const Note = require("../model/user-notes");

exports.read = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json({
      message: "Notes fetched Successfully",
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error,
    });
  }
};

exports.add = async (req, res) => {
  try {
    const addNote = new Note({
      title: req.body.title,
      description: req.body.description,
    });
    const note = await addNote.save();
    res.status(200).json({
      message: "Note Added Successfully!",
      notes: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding note",
      error: error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const note = await Note.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Note Deleted Successfully",
      notes: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const note = await Note.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.status(200).json({
      message: "Note Updated Successfully",
      notes: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error,
    });
  }
};
