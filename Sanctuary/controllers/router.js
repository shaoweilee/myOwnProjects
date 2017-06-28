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
            }
        });
    });
}
var showAllWZ = function(req, res){
    oDb.oFindWZ();
}
module.exports = {showKnowledge,showIncomingMessage,showAdmin,showAllWZ};