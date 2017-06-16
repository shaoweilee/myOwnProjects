var express = require("express");
var router = require("./controllers/router.js");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");

app.get("/konwledge", 
// function(res, req){
//     console.log(__filename);
// })

 router.showKnowledge);

app.listen(80, "127.0.0.1");