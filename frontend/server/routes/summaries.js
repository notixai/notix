const express = require("express");
const summariesRoutes = express.Router();

const mongoose = require('mongoose');
require("../model")
const Class = mongoose.model("classes")

summariesRoutes.route('/summaries').get(async (req, res) => {
    const notix_classes = await Class.find({});
    const results = [];
    notix_classes.forEach(n_class => {
        if (n_class.summary !== undefined){
            results.push({
                classID: n_class.class_id,
                summary: n_class.summary
            });
        }
    });
    res.send({summaries: results})
});

summariesRoutes.route("/summaries/:classRoomId/:classID").get(async (req, res) => {
    // TODO: Classroom ID currently not used as Classroom fucntionality has not been implemented yet.
    const notix_class = await Class.findOne({class_id: req.params.classID});
    console.log(notix_class);
    res.send(
        {
            classID: notix_class.class_id,
            summary: notix_class.summary
        }
    );
});

module.exports = summariesRoutes;