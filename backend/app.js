const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
// app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS")
    next();
})

app.get("/api/notes",(req,res,next)=>{
    const notes = [
        {
            id:"annsinf",
            title:"First Title",
            description:"First Description"
        },
        {
            id:"fsdffsdf",
            title:"Second Title",
            description:"Second Description"
        }
    ]
    res.status(200).json({
        message:"Notes fetched successfully",
        notes: notes
    })
}); 

module.exports = app;