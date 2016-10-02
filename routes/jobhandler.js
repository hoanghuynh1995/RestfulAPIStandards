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

//pagination
var defaultSize = 5;

var handler = {};
handler.readBooks = function(req){
    var res = {};
    res.paging = {};
    
    var page = req.query.page == null?1:req.query.page;
    var offset = req.query.offset==null?defaultSize:req.query.offset;//number of items in a page
    res.paging.page = parseInt(page);
    res.paging.offset = parseInt(offset);
    if((page - 1) * offset >= bookList.length){
        res.data = [];
        res.paging.total = 0;
        return res;
    }
    res.data = bookList.slice((page-1)*offset,(page-1)*offset + offset);
    res.paging.total = res.data.length;
    return res;
};
handler.writeBooks = function(book){
    book.id = Date.now();
    bookList.push(book);
    var str = JSON.stringify(bookList,null,4)//pretty print json
    fs.writeFile('./resources/danhsach.json',str,function(err){
        if(err) console.log("Error writing new book: " + err);
    });
};



module.exports = handler;
