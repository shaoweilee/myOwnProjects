var mongoClient = require("mongodb").MongoClient;
var dbconf = require("./dbconf.js").dbconf,
    pinglunUrl = dbconf.url_pinglun,
    wenzhangUrl = dbconf.url_wenzhang;

function oInsertWZ (data, callback) {
    mongoClient.connect(wenzhangUrl, function(err, db){
        if (err) {
            callback(err, null);
            db.close();
            return;
        }
        var col = db.collection("css");
        col.insertOne(data, function(err, result){
            callback(err, result)
            db.close();
        });
    });
}
function oFindWZ(json, callback){
    mongoClient.connect(wenzhangUrl, function(err, db){
        if (err) {
            callback(err, null);
            db.close();
            return;
        }
        var col = db.collection("css");
        col.find(json).toArray(function(err, result){
            if (err) {
                callback(err, null);
                db.close();
                return;
            }
            callback(null, result);
            db.close();
        });
    });
}
function oDelWZ(json, callback){
    mongoClient.connect(wenzhangUrl, function(err, db){
        if (err) {
            callback(err, null);
            db.close();
            return;
        }
        var col = db.collection("css");
        col.deleteOne(json, function(err, result){
            callback(err, result);
            db.close();
        });
    });
}
module.exports = {oInsertWZ,oFindWZ,oDelWZ};