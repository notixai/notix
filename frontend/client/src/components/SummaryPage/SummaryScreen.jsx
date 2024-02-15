import {useState, useEffect} from 'react';
import {Dialog, DialogTitle } from '@mui/material';
import {useNavigate} from 'react-router-dom';
// import { EditorProvider, useCurrentEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
const endpoint = `http://localhost:5000/summaries`;

const Editor = ({editor}) => {
    return (
        <EditorContent editor={editor} />
    )
}

// TODO: Complete useEffect to pull Records
// TODO: Give Summary Record proper key (based on payload)
export default function SummaryScreen(){
    const [records,setRecords] = useState([
            {
                className:"TestTestTest",
                summary:"m Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble"
            },
            {
                className:"Wow",
                summary:"m Ipsum sapdmsapmdsakdkmsakdksaldmsakdlaskmdklas ak dmsla;dm ;lsamd; slamdl;asm l;dasm;ld mas;dma s;ldm;sa md;la;dl mas;dis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble"
            }
            

        ]);

    useEffect(() => {
        async function getSummaryRecords() {
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
        <>
            <h1 className="transcript-page-heading">Transcripts</h1>
            {records.length === 0 ?
                <h2>No Transcriptions</h2> :
                <ol className="transcript-list">
                    {records.map( (record,i) => <li key={i}><SummaryRecord record={record}/></li>)}
                </ol>
            }
            
        </>
       
        
    )
}


function SummaryRecord({record}){
    const {summary,className} = record;
    const [open,setOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editable: true,
        content: summary,
    })

    function handleClose(){
        setOpen(false);
    }
    function handleOpen(){
        setOpen(true);
    }

    return (
        <div>
            <div className="transcript-record" onClick={handleOpen}>
                <h2 className="transcript-audio-name">{className}</h2>
            </div>
            <Dialog 
                open={open} 
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
                sx={{p:15}}
                className="transcript-pop-up"
            >
                <DialogTitle>Summary View</DialogTitle>
                <Editor editor={editor}/>
            </Dialog>
        </div>
        
    )
}