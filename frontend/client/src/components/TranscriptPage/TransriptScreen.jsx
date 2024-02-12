import {useState, useEffect} from 'react'

const endpoint = '';

export default function TranscriptScreen(){
    const [records,setRecords] = useState([]);

    useEffect(() => {
        async function getTranscriptRecords() {
            try{
                const response = await fetch(endpoint);
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
        <h1>No Records</h1> :
        records.map( (record) => <h1>"Hi"</h1>)
    )
}

function TranscriptRecord(){

}