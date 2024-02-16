const mongoose = require('mongoose');
const axios = require('axios');
var FormData = require('form-data');
const fs = require('fs');

require("./model")
const Recording = mongoose.model("recordings");
const Class = mongoose.model("classes");

const mongoDB = "mongodb://db:27017/notix";


main().catch((err) => console.log(err));

async function main(){
    await mongoose.connect(mongoDB);
    const pending_recordings = await Recording.find({processed:false});

    pending_recordings.forEach(pending_recording => {
        request_transcription(pending_recording.meta_data, pending_recording.class_id);
    });    
}

async function request_transcription(meta_data, classID){
    const data = new FormData();
    data.append('media', fs.createReadStream(`/usr/src/app/${meta_data.path}`));

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: 'http://ai:12009/transcribe',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };
    
    let transcript = await axios.request(config)
        .then((response) => {
            return response.data.transcript
        })
        .catch((error) => {
            console.log(error);
            return null;
        });

    await Class.findOneAndUpdate({class_id: classID}, {raw_transcription: transcript});

    console.log("Class Updated");
}
