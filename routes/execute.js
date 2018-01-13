var express=require("express");
var router=express.Router();
var mongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/each_day_something_new";

router.get("/",function (req,res,next){
    var scriptName=req.query.scriptName;
    mongoClient.connect(url,function(err,db){
        if (!err){
            var objToFind={"name":req.query.scriptName};
            db.collection("python_scripts").find(objToFind).toArray(function(err,arRecs){
                db.close();
                if (!err){
                    var sScript="";
                    if (arRecs.length>0)sScript=arRecs[0].code;
                    var sResult="script="+sScript;
                    console.log(sResult);
                    res.send(sResult);
                }else{
                    console.log("error in execute - in find");
                }

            })

            
        }
        else{
            var sResult="error in execute - connection to db failed";
            console.log(sResult);
            res.send(sResult);
        }
    })

})

module.exports=router;