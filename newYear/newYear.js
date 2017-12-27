var express = require("express");
var app = express();

app.use(express.static("./public"));

app.listen(80, "127.0.0.1");
// app.listen(80, "172.17.116.6");
