const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

// const { mongoose } = require('./db/mongoose');
// const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});


var server = app.listen(port, function() {
	console.log(`Grocery Guru listening on port ${port}`);
});

module.exports = app;
