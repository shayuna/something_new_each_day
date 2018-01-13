var express=require("express");
var router=express.Router();
var mongoClient=require("mongodb").MongoClient;
var fs=require("fs");
var url="mongodb://localhost:27017/each_day_something_new";

router.get("/",function(req,res,next){
    fs.readFile("./public/removeScript.htm","utf8",function(err,contents){
        res.send(contents);
    })
});

router.post("/",function(req,res,next){
    var scriptName=req.body.scriptName;
    mongoClient.connect(url,function(err,db){
        if (!err){
            var objToRemove={"name":scriptName};
            db.collection("python_scripts").remove(objToRemove,function(err,oResult){
                db.close();
                var sResult="";
                if (!err){
                    sResult="number of scripts removed is - "+oResult.result.n;
                }else{
                    sResult="removing script from list failed";
                }
                fs.readFile("./public/removeScriptOK.htm",function(err,contents){
                    contents=contents.toString().replace("*&*",sResult);
                    res.send(contents);
                })
                console.log(sResult);
            })
        }else{
            var sErr="in unregister - err in connecting to db";
            console.log(sErr);
            res.send(sErr);
        }
    })
})

module.exports=router;
