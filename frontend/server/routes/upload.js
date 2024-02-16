const express = require("express");
const uploadRoutes = express.Router();

const multer = require('multer');
const mongoose = require('mongoose');
const path = require("path");

require("../model")
const Recording = mongoose.model("recordings");
const Class = mongoose.model("classes");


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
        let temp_id = Date.now()
        const n_class = new Class();
        n_class.class_id = temp_id;
        n_class.tags = req.body.tags.split(",");
        n_class.save()

        const recording = new Recording();
        recording.class_id = temp_id;
        recording.meta_data = req.file;
        recording.processed = false;
        recording.save().then(()=>{
        res.send({message: "Recording Upload Successful"})
        })
    })
}

uploadRoutes.route("/upload-audio").post(obj);

module.exports = uploadRoutes;