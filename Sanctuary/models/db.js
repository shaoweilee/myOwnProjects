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
function bianli(json, callback) {//接收查询条件，返回查询结果
    mongoClient.connect(wenzhangUrl, function(err, db){
        if (err) {
            callback(err, null);
            db.close();
            return;
        }
        db.collections(function(err, cols){
            var allResult = [];
            for (var i = 1; i < cols.length; i++) {//第一个是system，没用。所以从第二个开始。
                (function(i){
                    cols[i].find(json).toArray(function (err, result) {//每一个cols[i]，都是一个单独的集合。
                        if (err) {
                            callback(err, null);
                            db.close();
                            return;
                        }
                        // console.log(i);//better with concat(), isn't it?
                        allResult = allResult.concat(result);
                        if (i == cols.length - 1) {
                            callback(null, allResult);
                            db.close();
                        }
                        // result.forEach(function(ele, index, arr){//牵扯到空数组调用foreach的问题 空数组调用foreach的话，无效果

                            // if (ele.length > 0) {
                                // console.log(79, ele);
                                // callback(null, ele);
                                // allResult.push(ele);
                                // if (i == cols.length - 1) {
                                    // console.log(i);
                                    // callback(null, allResult);
                                    // db.close();
                                // }
                                // db.close();
                            // }
                        // });
                    });
                })(i);
            }
        });
    });
}
// bianli({"biaoti": "上传图片到服务器"},function(err, result){
//     console.log("**************************\n", result);
// });
module.exports = {oInsertWZ,oFindWZ,oDelWZ,bianli};