var express = require('express');
var router = express.Router();
var jobHandler = require('./jobhandler');

var fs = require("fs");
var bodyParser = require('body-parser');
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// fs.readFile('./resources/danhsach.json',function(err,data){
//   if(err) throw err;
//   bookList = JSON.parse(data);
// });
/* GET home page. */

router.get('/api/v1/books.json', function(req, res) {
  console.log("Client requests book list");
  var studentList = [];
  var data = jobHandler.readBooks();
  res.json(data);
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
router.post('/api/v1/books')
module.exports = router;
