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
    res.json({status : "Files recieved"})
})

app.listen(8000 , ()=>{
    console.log("Server is listening")
})