var path = require("path");
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
        console.log(data);
        oDb.oInsertWZ(data, function(err, result){
            if (err) {
                console.log(err);
                return;
            } else {
                console.log(result.result);
                res.send("1");
            }
        });
    });
}
var showAllWZ = function(req, res){
    console.log(req.query.fenleis);
    var allResult = [];
    req.query.fenleis.forEach(function(ele, index, arr){
        oDb.oFindWZ(ele, {}, function(err, result){//我是异步哦
            if (err) {
                console.log(err);
                return;
            } else {
                // console.log(result);
                console.log(result);
                allResult.push(result);
                if (index = arr.length-1) {
                    res.send(allResult);
                    console.log(43, allResult);
                }
            }
        });
    });
}
var showCertain = function(req, res){
    oDb.oFindWZ(req.query, function(err, result){
        if (err) {
            console.log(err);
            return;
        } else {
            // console.log(result);
            res.json(result);
            console.log(result);
        }
    });
}
var delCertain = function(req, res){
    oDb.oDelWZ(req.query, function(err, result){
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(result.result);
            res.send("1");
        }
    });
}
module.exports = {showKnowledge,showIncomingMessage,showAdmin,showAllWZ,showCertain,delCertain};