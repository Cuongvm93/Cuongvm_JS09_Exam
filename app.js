const express=require("express")
const app=express();
const bodyParser=require("body-parser")
const morgan=require("morgan")
const querystring=require("querystring")
const fs=require("fs");
const { json } = require("body-parser");
const port=3000
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(morgan("combined"))
// get api
app.get("/api/v1/feedbacks",(req,res)=>{
    fs.readFile("./dev-data/feedbacks.json","utf8",(err,data)=>{
        if (err) {
            res.status(500).json({
                status:"fail",
                message:err.message
            })
        }else{
            res.status(200).json(data)
        }
    })
})




app.get("/",(req,res)=>{
    res.sendFile("index.html",{root:"./public"})
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})