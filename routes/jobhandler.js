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
    //check whether the requested resource existed
    if((page - 1) * offset >= bookList.length){
        res.data = [];
        res.paging.total = 0;
        return res;
    }
    res.data = bookList.slice((page-1)*offset,(page-1)*offset + offset);
    //filter
    filter(res.data,req);
    res.paging.total = res.data.length;

    //sorting
    var sort = req.query.sort;
    if(sort != null){
        if(sort.charAt(0) == '-'){ //-> in descending order
            sort = sort.substring(1,sort.length);
            res.data.sort(function(a,b){
                if(a[sort] > b[sort]){
                    return -1;
                }
                if(a[sort] < b[sort]){
                    return 1;
                }
                return 0;
            });
        }else{
            res.data.sort(function(a,b){
                if(a[sort] > b[sort]){
                    return 1;
                }
                if(a[sort] < b[sort]){
                    return -1;
                }
                return 0;
            });
        }

    }

    //limit fields
    res.data = limitField(res.data,req);
    return res;
};
var filter = function(arr,req){
    var filterParams = {};
    filterParams.name = req.query.name;
    filterParams.genre = req.query.genre;
    filterParams.author = req.query.author;
    if(filterParams.name != null) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name != filterParams.name) {
                arr.splice(i, 1);
                i--;
            }
        }
        if (filterParams.genre != null) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].genre != filterParams.genre) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
        if (filterParams.author != null) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].author != filterParams.author) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
    }
};
var limitField = function(arr,req){
    if(req.query.fields != null) {
        var fields = req.query.fields.split(',');//field list
        var newArr = [];
        for(var i=0;i<arr.length;i++){
            var ele = {};
            for(var j=0;j<fields.length;j++){
                ele[fields[j]] = arr[i][fields[j]];
            }
            newArr.push(ele);
        }
        return newArr;
    }
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
