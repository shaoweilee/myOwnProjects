var mongoClient = require("mongodb").MongoClient;
var dbconf = require("./dbconf.js").dbconf,
    pinglunUrl = dbconf.url_pinglun,
    wenzhangUrl = dbconf.url_wenzhang;

function oInsertWZ (data, callback) {
    mongoClient.connect(wenzhangUrl, function(err, db){
        if (err) {
            callback(err, null);
            return;
        }
        var col = db.collection("css");
        col.insertOne(data, function(err, result){
            callback(err, result)
            db.close();
        });
    });
}

module.exports = {oInsertWZ};