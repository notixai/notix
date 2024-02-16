import {useState, useEffect} from 'react';
import {Dialog, DialogTitle } from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
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
    //Records to be taken
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

    //Grab the records from the server
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
                console.error("There was an issue getting the summaries");
            }
        }
    },[]);

    return (
        <>
            <h1 className="summary-page-heading">Summaries</h1>
            {records.length === 0 ?
                <h2>No Summaries</h2> :
                <ol className="summary-list">
                    {records.map( (record,i) => <li key={i}><SummaryRecord record={record}/></li>)}
                </ol>
            }
            
        </>
    )
}

// Add loader for this so the data is pulled while the page is loading?
export function StudentSummary(){
    const {summary, className} = useLocation().state; //If loader we replace this?
    
    //Defines an editor to be used on the page
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editable: true,
        "type": "doc",
        content: summary,
    })

    function handleSave(){
        const json = editor.getJSON();
        // Check if this is new document or a save as, if it is then it is a save as
        // add handleSaveAs
        // Add post to save
    }
    function handleSaveAs(){

    }

    return(
        <div className="editor-window">
            <h1>{className}</h1>
            <button onClick={handleSave}>Save</button>
            <Editor editor={editor}/>
        </div>
    )
}

//Original Summary pulled from the database (not student copy)
function SummaryRecord({record}){
    const {summary,className} = record;
    const [open, setOpen] = useState(false); //To open and close dialog box
    const navigate = useNavigate();
    //Editor to give read only view to these documents
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editable: false,
        "type": "doc",
        content: summary,
    })

    function handleClose(){
        setOpen(false);
    }
    function handleOpen(){
        setOpen(true);
    }

    /**
     * @todo Consider if getCopy posts to server and then navigates without passing state
     */
    function handleGetCopy(){
        const summaryJSON = editor.getJSON();
        // Navigate with state maybeeee temporary
        //  Thinking of whether 
        navigate('/notebook',{state: { summary: summaryJSON, className: className}})
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
                <button onClick={handleGetCopy}>Get Copy</button>
                <button onClick={handleClose}>x</button>
                <DialogTitle>Summary View</DialogTitle>
                <Editor editor={editor}/>
            </Dialog>
        </div>
        
    )
}