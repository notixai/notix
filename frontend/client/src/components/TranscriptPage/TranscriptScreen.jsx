import {useState, useEffect} from 'react';
import { TextField,Dialog, DialogTitle } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const endpoint = `http://localhost:5000/transcripts`;

// TODO: Complete useEffect to pull Records
// TODO: Give Transcript Record proper key (based on payload)
export default function TranscriptScreen(){
    const [records,setRecords] = useState([{audioName:"Test",raw_transcription:"m Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble"}]);

    useEffect(() => {
        async function getTranscriptRecords() {
            try{
                const response = await fetch(endpoint);
                //Success
                if(response.status === 200)
                {
                    const results = await response.json();
                    setRecords(results);
                }
            } catch (e){
                console.error("There was an issue getting the transcripts");
            }
        }
    },[]);

    return (
        records.length === 0 ?
        <h1>No Transcriptions</h1> :
        <ol>
            {records.map( (record,i) => <li key={i}><TranscriptRecord record={record}/></li>)}
        </ol>
        
    )
}

/**
 * 
 * @param {Object} record - The record that holds a transcription
 * @param {string} record.audioName - Contains name of audio
 * @param {string} raw_transcription - Contains the original transcription provided by the service
 */

// TODO: Make Dialog Boox a nicer to look at
// TODO: Give transcripts items a nicer look
// TODO: Verifiy returns for post
// TODO: Remove Transcript from record list
function TranscriptRecord({record}){
    const {audioName, raw_transcription} = record;
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
            formData.append("Edited_Transcription",editedTranscript);
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
            navigate("/failure", {state: {title: "Failure", status:"failure", message: error}});
        }
    }

    function handleResetTranscript(){
        setEditedTranscript(raw_transcription);
    }
    return (
        <>
            <div className="transcript-record" onClick={handleOpen}>
                <h2>{audioName}</h2>
            </div>
            <Dialog 
                open={open} 
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogTitle>Edit Transcript</DialogTitle>
                <button onClick={handleClose}>&times;</button>
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
                <button onClick={handleResetTranscript}>Reset</button>
                <button onClick={handleSendTranscript}>Send</button>
            </Dialog>
        </>
        
    )
}