const express = require("express");
const uploadRoutes = express.Router();

const multer = require('multer');
const mongoose = require('mongoose');
const path = require("path");

require("../model")
const File = mongoose.model("file");


const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb){
      cb(null, 'class_id-user_id' + Date.now() + path.extname(file.originalname));
    }
})
  
const upload = multer({
    storage: storage,
    limits: {fileSize: 500000000}
}).single("audio-upload");

const obj = (req, res) => {
    upload(req, res, () => {
        // console.log("Request ----", req.body);
        // console.log("Request file ----", req.file);
        // console.log("Request file ----", req.body.tags);
        const file = new File();
        file.meta_data = req.file;
        file.tags = req.body.tags.split(",");
        file.processed = false;
        file.save().then(()=>{
        res.send({message: "Upload Successful"})
        })
    })
}

uploadRoutes.route("/upload-audio").post(obj);

module.exports = uploadRoutes;