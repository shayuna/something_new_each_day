var express=require("express");
var app=express();
var regScriptRoute=require("./routes/register");
var unregScriptRoute=require("./routes/unregister");
var executeRoute=require("./routes/execute");
var path=require("path");
var bodyParser=require("body-parser");


app.use("/public",express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/register",regScriptRoute);
app.use("/unregister",unregScriptRoute);
app.use("/execute",executeRoute);

app.get("/*",function(req,res,next){
    res.send ("you should stop the liquer and start giving me real stuff");
    console.log("usual customers, so far");
})

app.listen(8081);