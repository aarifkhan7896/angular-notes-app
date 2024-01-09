const express = require('express');
const app = express();

app.use((req,res,next)=>{
    res.send('first express app');
});

module.exports = app;