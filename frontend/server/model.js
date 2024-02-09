var mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    meta_data: {},
    tags: [],
    processed: Boolean
});

mongoose.model("file", fileSchema);