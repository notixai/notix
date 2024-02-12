var mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     roles: [{}]
// });

const recordingSchema = new mongoose.Schema({
    // class_id: String,
    // recorder: User,
    tags: [],
    meta_data: {},
    processed: Boolean,
    uploaded: { type: Date, default: Date.now }
});
mongoose.model("recording", recordingSchema);

const classSchema = new mongoose.Schema({
    // TODO: Move Tags to Class Object, so that Tags can be assigned to a class and not indivdual recording form the class
    class_datetime: Date,
    raw_transcription: String,
    editted_transcription: String,
    summary: String,
    recorders: {}
    // recorders consist of recorders User ID and 
});
mongoose.model("class", classSchema);

const classroomSchema = new mongoose.Schema({
    course_name: String,
    course_code: String,
    // lecturer: User;
    // classes: [
    //     {
    //         type: mongoose.ObjectId,
    //         ref: 'class'
    //     }
    // ],
    // participates: [User],
    start_date: Date,
    end_date: Date

});
mongoose.model("classroom", classroomSchema);