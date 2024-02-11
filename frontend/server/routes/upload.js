const express = require("express");
const uploadRoutes = express.Router();

const multer = require('multer');
const mongoose = require('mongoose');
const path = require("path");

require("../model")
const Recording = mongoose.model("recording");


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
        const recording = new Recording();
        recording.meta_data = req.file;
        recording.tags = req.body.tags.split(",");
        recording.processed = false;
        recording.save().then(()=>{
        res.send({message: "Recording Upload Successful"})
        })
    })
}

uploadRoutes.route("/upload-audio").post(obj);

module.exports = uploadRoutes;