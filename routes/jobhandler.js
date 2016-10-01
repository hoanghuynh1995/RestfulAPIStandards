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
handler.writeBooks = function(book){
    book.id = Date.now();
    bookList.push(book);
    var str = JSON.stringify(bookList,null,4)//pretty print json
    fs.writeFile('./resources/danhsach.json',str,function(err){
        if(err) console.log("Error writing new book: " + err);
    });
}

module.exports = handler;
