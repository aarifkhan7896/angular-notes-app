const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Notes = require('./model/user-notes');

mongoose.connect('mongodb://localhost:27017/userNotes')
.then(()=> console.log('Connected Successfully'))
.catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS")
    next();
})

app.post('/api/notes', (req,res)=>{
    const addNote = new Notes({
        title: req.body.title,
        description: req.body.description
    });
    addNote.save().then((note)=>{
        res.status(200).json({
            message: "Note Added Successfully!",
            notes: note
        })
    }).catch((error) => {
        res.status(500).json({
            message: "Error adding note",
            error: error
        });
    });
})

app.get('/api/notes', (req,res)=>{
    Notes.find().then((notes)=>{
        res.status(200).json({
            message: "Notes fetched Successfully",
            notes: notes
        })
    }).catch((error) => {
        res.status(500).json({
            message: "Error fetching notes",
            error: error
        });
    });
})

app.delete('/api/notes/:id',(req,res)=>{
    Notes.deleteOne({_id: req.params.id}).then((note)=>{
        res.status(200).json({
            message: "Note Deleted Successfully",
            notes: note
        })
    }).catch((error) => {
        res.status(500).json({
            message: "Error deleting note",
            error: error
        });
    });
})

module.exports = app;