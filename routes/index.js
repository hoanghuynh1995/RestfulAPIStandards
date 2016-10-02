var express = require('express');
var router = express.Router();
var jobHandler = require('./jobhandler');

var fs = require("fs");
var bodyParser = require('body-parser');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// fs.readFile('./resources/danhsach.json',function(err,data){
//   if(err) throw err;
//   bookList = JSON.parse(data);
// });
/* GET home page. */

router.get('/api/v1/books.json', function(req, res) {
  console.log("Client requests book list");
  var data = jobHandler.readBooks(req);
  res.json(data);
  // data.data=jobHandler.readBooks(req);
  // data.paging={};
  // data.paging.page = 1;
  // data.paging.offset = 5;
  //
  // data.paging.total = data.data.length;
  // if(data != null) {
  //   data.paging={};
  //   data.paging.page = 1;
  //   data.paging.offset = 5;
  //
  //   data.paging.total = data.data.length;
  //   res.json(data);
  // }else {
  //   res.status(404).send("No more books");
  // }
});
router.get('/api/v1/books/:id',function(req,res){
  var id = req.params.id;
  var bookList = jobHandler.readBooks();
  console.log("Client requests book " + id);
  for(var i=0;i<bookList.length;i++){
    if(id == bookList[i].id){
      res.jsonp(bookList[i]);
      return;
    }
  }
  res.status(404).send("Resource can't be found");
});
router.post('/api/v1/books',function(req,res){
  console.log("Client post book " + req.query);
  var newBook = req.body;
  if(newBook.name == null || newBook.genre == null || newBook.author == null){
    res.status(400).send("lack of info");
  }
  jobHandler.writeBooks(newBook);
});

module.exports = router;
