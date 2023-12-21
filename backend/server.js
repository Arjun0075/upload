const express = require("express");
const multer = require("multer");
const cors = require("cors")

const app = express()
app.use(cors());

const storage = multer.diskStorage({
    destination : function (req, file , callback) {
        callback(null, __dirname + "/uploads")
    },
    filename : function (req, file , callback){
        callback(null , file.originalname)
    }
})

const uploads =  multer({storage: storage});

app.post("/upload" , uploads.array("file") , (req, res) => {
    console.log(req.body)
    console.log(req.files)
    if(req.files){
        res.json({status : 200 }, {message : "File uploaded successfully"})
    }
    
})

app.listen(8000 , ()=>{
    console.log("Server is listening")
})