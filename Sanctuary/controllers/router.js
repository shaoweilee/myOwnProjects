var path = require("path");
var fs = require("fs");
var formidable = require("formidable");
var oDb = require("../models/db.js");
var showKnowledge = function(req, res){
    res.sendFile(
    // console.log(
        path.normalize(__dirname + "/../views/knowledge.html")
    )
}
var showAdmin = function(req, res){
    res.sendFile(path.normalize(__dirname + "/../views/admin.html")
    )
}
var showIncomingMessage = function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, data, files){
        console.log("进来的文章", data);
        oDb.oInsertWZ(data, function(err, result){
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("插入数据库结果", result.result);
                res.send("1");
            }
        });
    });
}
var showAllWZ = function(req, res){
    var allResult = [];
    var i = 1;
    // (function iterator(i){

    // })(0);
    for (var i = 0; i < req.query.fenleis.length; i++) {
        var ele = req.query.fenleis[i];
        // console.log(ele);
        oDb.oFindWZ(ele, {}, function(err, result){
            if (err) {
                console.log(err);
                return;
            } else {
                allResult.push(result);
                if (allResult.length == req.query.fenleis.length) {
                    // console.log(allResult);
                    res.send(allResult);
                }
            }
        });
    }
}
var showCertain = function(req, res){
    oDb.bianli(req.query, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        // console.log(59, result);
        res.send(result);
    });
    // oDb.oFindWZ(req.query, function(err, result){
    //     if (err) {
    //         console.log(err);
    //         return;
    //     } else {
    //         // console.log(result);
    //         res.json(result);
    //         console.log(result);
    //     }
    // });
}
var delCertain = function(req, res){
    oDb.oDelWZ(req.query, 
        function(err, result){//callback
            console.log("要删除的是：", req.query);
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("删除结果", result.result);
                res.send("1");
            }
        }
    );
}
var saveImg = function(req, res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/!uploadFiles";
    form.parse(req, function(err, fields, files){
        for (var key in files) {
            if (files.hasOwnProperty(key)) {
                var element = files[key];
                var oldPath = "./" + element.path;
                var newPath = "./public/!uploadFiles/" + element.name;
                fs.renameSync(oldPath, newPath);
                res.send({
                    errno: 0,
                    data: ["http://localhost/!uploadFiles/" + element.name]
                });
            }
        }
    });
}
module.exports = {showKnowledge,showIncomingMessage,showAdmin,showAllWZ,showCertain,delCertain,saveImg};