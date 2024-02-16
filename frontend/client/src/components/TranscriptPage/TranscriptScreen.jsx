import {useState, useEffect} from 'react';
import { TextField,Dialog, DialogTitle } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const endpoint = `http://localhost:5000/transcripts`;

// TODO: Complete useEffect to pull Records
// TODO: Give Transcript Record proper key (based on payload)
export default function TranscriptScreen(){
    const [records,setRecords] = useState([]);

    useEffect(() => {
        async function getTranscriptRecords() {
            try{
                const response = await fetch(endpoint);
                //Success
                if(response.status === 200)
                {
                    const json = await response.json();
                    const results = json.raw_transcriptions;
                    setRecords(results);
                }
            } catch (e){
                console.error("There was an issue getting the transcripts");
            }
        }
        getTranscriptRecords();
    },[]);
    return (
        <>
            <h1 className="transcript-page-heading">Transcripts</h1>
            {records.length === 0 ?
                <h2>No Transcriptions</h2> :
                <ol className="transcript-list">
                    {records.map( (record) => <li key={record.classID}><TranscriptRecord record={record}/></li>)}
                </ol>
            }
        </>
       
        
    )
}

/**
 * 
 * @param {Object} record - The record that holds a transcription
 * @param {string} record.classID- Contains the classID
 * @param {string} raw_transcription - Contains the original transcription provided by the service
 */

// TODO: Make Dialog Boox a nicer to look at
// TODO: Give transcripts items a nicer look
// TODO: Verifiy returns for post
// TODO: Remove Transcript from record list
function TranscriptRecord({record}){
    const {classID, raw_transcription} = record;
    const [open,setOpen] = useState(false);
    const [editedTranscript, setEditedTranscript] = useState(raw_transcription);
    const navigate = useNavigate();

    function handleClose(){
        setOpen(false);
    }
    function handleOpen(){
        setOpen(true);
    }

    async function handleSendTranscript(e){
        try{
            const formData = new FormData();
            formData.append("editted_transcription",editedTranscript);
            formData.append("classID",classID);
            const response = await fetch('http://localhost:5000/transcripts', {
                method: "POST",
                "Content-Type": "application/x-www-form-urlencoded",
                body: formData
            })

            const result = await response.json();

            //Success
            if(response.status === 201)
                navigate("/success", {state: { title: "Success", status: "success", message: result.message}});
            else
                navigate("/failure", {state: { title: "Failure", status: "failure", message: result.message}});
                
        } catch(error){
            console.error("Error");
            navigate("/failure", {state: {title: "Failure", status:"failure", message: error.message}});
        }
    }

    function handleResetTranscript(){
        setEditedTranscript(raw_transcription);
    }
    return (
        <div>
            <div className="transcript-record" onClick={handleOpen}>
                <h2 className="transcript-audio-name">{classID}</h2>
            </div>
            <Dialog 
                open={open} 
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
                sx={{p:15}}
                className="transcript-pop-up"
            >
                <DialogTitle>Edit Transcript</DialogTitle>
                <button className="button close-button" onClick={handleClose}>&times;</button>
                <TextField 
                    id="edited-transcript" 
                    name="edited-transcript" 
                    label="Transcript" 
                    type="text" 
                    value={editedTranscript} 
                    multiline={true}
                    autoFocus={true}
                    onChange={(e) => setEditedTranscript(e.target.value)}
                    minRows={5}
                    maxRows={15}
                />
                <div className="buttons-container">
                    <button className="button" onClick={handleResetTranscript}>Reset</button>
                    <button className="button" onClick={handleSendTranscript}>Send</button>
                </div>
            </Dialog>
        </div>
        
    )
}