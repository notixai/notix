const express = require("express")
const transcriptRoutes = express.Router();

const mongoose = require('mongoose');

require("../model")
const Class = mongoose.model("classes");

transcriptRoutes.route("/transcripts/:classRoomId/:classId").get((req, res) => {
    console.log(req.params);

    const notix_class = Class.findOne({class_id: req.params.classId});

    res.send(notix_class.raw_transcription);
});



module.exports = transcriptRoutes;