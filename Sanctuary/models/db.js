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
        var col = db.collection(data.fenlei);
        col.insertOne(data, function(err, result){
            callback(err, result)
            db.close();
        });
    });
}
function oFindWZ(colName, json, callback){
    mongoClient.connect(wenzhangUrl, function(err, db){
        if (err) {
            callback(err, null);
            db.close();
            return;
        }
        var col = db.collection(colName);
        // console.log(colName);
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
        db.collections(function(err, cols){
            for (var i = 1; i < cols.length; i++) {
                // console.log(49, cols[i].collectionName);
                cols[i].deleteOne(json, function(err, result){
                    if (result.deletedCount !== 0) {
                        callback(err, result);
                        db.close();
                    }
                });
            }
        });
    });
}
// 输入标题，可以遍历所有数据库，并返回该文章以及所在的集合
// function bianli(json, callback) {
//     mongoClient.connect(wenzhangUrl, function(err, db){
//         if (err) {
//             callback(err);
//             db.close();
//             return;
//         }
//         db.collections(function(err, cols){
//             for (var i = 1; i < cols.length; i++) {
//                 cols[i].find(json, function (err, result) {
//                     callback(result);
//                 });
                
//             }
//         });
//     });
// }
module.exports = {oInsertWZ,oFindWZ,oDelWZ};