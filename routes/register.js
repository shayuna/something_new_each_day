var express=require("express");
var router=express.Router();
var mongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/each_day_something_new";
var fs=require("fs");

router.get("/",function(req,res,next){
    fs.readFile("./public/addScript.htm","utf8",function(err,contents){
        res.send(contents);
    })
})

router.post("/",function(req,res,next){
    mongoClient.connect(url,function(err,db){
        if (!err){
            var objToInsert = {"name":req.body.scriptName,"code":req.body.scriptCode};
            db.collection("python_scripts").insert(objToInsert,function(err,result){
                db.close();
                if (!err){
                    console.log ("insert succeeded. result is - "+result);
                    fs.readFile("./public/addScriptOK.htm","utf8",function(err,contents){
                        res.send(contents);
                    })
                }else{
                    console.log("err in register. failure in add record to collection");
                    res.send ("error in add record to collection");
                }
            })
        }
        else{
            console.log ("err in register. failure in connection to db");
            res.send("error in connecting to db");
        }
    })
})

module.exports = router;