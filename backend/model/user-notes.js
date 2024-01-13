const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title : { type: String, required: true},
    description: {type : String}
});

module.exports = mongoose.model('notes', notesSchema);