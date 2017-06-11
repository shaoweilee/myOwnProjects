var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");

// app.get("/", );

app.listen(80, "127.0.0.1");