/**
 * Created by hoang on 10/1/2016.
 */
var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var bookList = [];
fs.readFile('./resources/danhsach.json',function(err,data){
    if(err) throw err;
    bookList = JSON.parse(data);
});

var handler = {};
handler.readBooks = function(){
    return bookList;
}

module.exports = handler;
