import {useState} from 'react'
/**
 * 
 * Upload page for the app
 */
export default function UploadPage(){
    const [tags,setTags] = useState(["CSS","HTML"]);

    /**
     * 
     * @param {event} e 
     * Takes the input from the label-input and appends it to the other tags
     */
    function addTag(e){
        if(e.key==="Enter")
        {
            setTags( (prevTags) => [...prevTags,e.target.value]);
            e.target.value = "";
        }
    }
    return(
        <>
            <form className="form upload-form" action="" method="POST" onSubmit={(e) => e.preventDefault()}>
                <div className="tags-container">
                    <ul id="tag-list">
                        {
                            tags.map( (tag,index) => <li key={index}>{tag}</li>)
                        }
                    </ul>
                    <input id="tag-input" type="text" placeholder="Add Tag" onKeyUp={addTag}/>
                </div>
                
                <label id="audio-upload-label" htmlFor="audio-upload">Upload Audio</label>
                <input 
                    type="file" 
                    id="audio-upload" 
                    name="audio-upload"
                    accept=".mp3,.wav"
                    placeholder="Upload Audio" />
                <div className="file-info">
                    <span>Name: </span>
                    <span>Size: </span>
                    <span>Length: </span>
                </div>
            </form>
        </>
    )
}
