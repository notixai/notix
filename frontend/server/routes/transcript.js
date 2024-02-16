const express = require("express");
const axios = require('axios');
const transcriptRoutes = express.Router();

const mongoose = require('mongoose');

require("../model")
const Class = mongoose.model("classes");

// TODO: Added get all transcripts function for POC

transcriptRoutes.route('/transcripts').get(async (req, res) => {
    const notix_classes = await Class.find({});
    const results = []
    notix_classes.forEach(n_class => {
        results.push({
            classID: n_class.class_id,
            raw_transcription: n_class.raw_transcription
        });
    });
    res.send({raw_transcriptions: results})
});

transcriptRoutes.route("/transcripts/:classRoomId/:classID").get(async (req, res) => {
    // TODO: Classroom ID currently not used as Classroom fucntionality has not been 
    // implemented yet.

    const notix_class = await Class.findOne({class_id: req.params.classID});
    res.send(
        {
            classID: notix_class.class_id,
            raw_transcription: notix_class.raw_transcription
        }
    );
});

transcriptRoutes.route("/transcripts").post(async (req, res) => {
    // Add Editted Transcript to Class Document 
    await Class.findOneAndUpdate({class_id: req.body.classID}, {editted_transcription: req.body.editted_transcript });
    
    const notix_class = await Class.findOne({class_id: req.body.classID});

    const data = {
        topics: notix_class.tags, 
        transcript: req.body.editted_transcription
    };
    let summary = await axios.post('http://ai:12009/summarise', data)
        .then((response) => {
            return response.data.Summary;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
    
    await Class.findOneAndUpdate({class_id: req.body.classID}, {summary: summary});

});

module.exports = transcriptRoutes;