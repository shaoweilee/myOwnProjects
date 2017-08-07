var path = require("path");
var fs = require("fs");
var formidable = require("formidable");
var dbconf = require("../models/dbconf.js").dbconf,
    pinglunUrl = dbconf.url_pinglun,
    wenzhangUrl = dbconf.url_wenzhang;
var oDb = require("../models/db.js");
var showKnowledge = function(req, res){
    res.sendFile(
    // console.log(
        path.normalize(__dirname + "/../views/articles.html")
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
        oDb.oInsertWZ(wenzhangUrl, data, function(err, result){
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
    var oallResult = [];
    oDb.bianli(wenzhangUrl, {}, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        result.forEach(function(ele, index, arr) {
            // console.log(ele);
            delete ele.zhengwen;
            delete ele._id;
            oallResult.push(ele);
        }, this);
        res.send(oallResult);
    });
    // var allResult = [];
    // var i = 1;
    // // (function iterator(i){

    // // })(0);
    // for (var i = 0; i < req.query.fenleis.length; i++) {
    //     var ele = req.query.fenleis[i];
    //     // console.log(ele);
    //     oDb.oFindWZ(ele, {}, function(err, result){
    //         if (err) {
    //             console.log(err);
    //             return;
    //         } else {
    //             allResult.push(result);
    //             if (allResult.length == req.query.fenleis.length) {
    //                 // console.log(allResult);
    //                 res.send(allResult);
    //             }
    //         }
    //     });
    // }
}
var showCertain = function(req, res){
    oDb.bianli(wenzhangUrl, req.query, function(err, result){
        console.log(req.query);
        if (err) {
            console.log(err);
            return;
        }
        res.send(result);
    });
}
var showArticle = function(req, res){//传送模板knowledge.html
    res.sendFile(
        // console.log(
        path.normalize(__dirname + "/../views/knowledge.html")
    )
};
var delCertain = function(req, res){
    oDb.oDelWZ(wenzhangUrl, req.query, 
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
    form.uploadDir = "./public/uploadFiles";
    form.parse(req, function(err, fields, files){
        for (var key in files) {
            if (files.hasOwnProperty(key)) {
                var element = files[key];
                var oldPath = "./" + element.path;
                var newPath = "./public/uploadFiles/" + element.name;
                fs.renameSync(oldPath, newPath);
                res.send({
                    errno: 0,
                    // data: ["http://localhost/uploadFiles/" + element.name]
                    data: ["http://www.herosanctuary.com/uploadFiles/" + element.name]
                });
            }
        }
    });
}

var showPL = function(req, res){
    oDb.ofindPL(pinglunUrl, req.query.biaoti, function(err, results){
        res.send(results);
    });
    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, data, files){
    //     console.log(data);
    // });
    // oDb.bianli
}
var addPL = function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, data, files){//data includes: title, userName, comments
        oDb.getCollectionAndInsertPL(pinglunUrl, data, function(err, result){
            if (err) {
                console.log(err);
                return;
            } else {
                console.log("插入评论结果", result.result);
                res.send("1");
            }
        });
    });
}
module.exports = {showKnowledge,showIncomingMessage,showAdmin,showAllWZ,showCertain,showArticle,delCertain,saveImg,showPL,addPL};