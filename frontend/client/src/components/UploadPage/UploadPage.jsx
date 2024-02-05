import {useState} from 'react'
/**
 * 
 * Upload page for the app
 */

let curID = 1;

export default function UploadPage(){
    const [tags,setTags] = useState([]);
    const [newTag, setNewTag] = useState('')
    const [curFile, setCurFile] = useState({});
    /**
     * 
     * @param {event} e 
     * Takes the input from the label-input and appends it to the other tags
     */
    function handleAddTag(e){
        if((e.type === 'keydown' && e.key === 'Enter') || e.type==='blur')
        {
            if(newTag.trim())
            {
                setTags([...tags,{id: curID++, tagName:newTag}]);
                setNewTag('');
            }        
        }
    }
    function handleAddFile(e){
        setCurFile(e.target.files[0])
    }

    return(
        <>
            <div className="tags-container">
                <ul id="tag-list">
                    {
                        tags.map( (tag) => (
                            <li key={tag.id}>
                                {tag.tagName}
                                <button onClick={() => {
                                    setTags( (curTags) => curTags.filter( (curTag) => tag.id != curTag.id))
                                }}>
                                    &times;
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
                <input 
                    id="tag-input" 
                    type="text" 
                    placeholder="Add Tag" 
                    value={newTag}
                    onBlur={handleAddTag} 
                    onKeyDown={handleAddTag}
                    onChange={ (e) => {setNewTag(e.target.value)}}
                />
            </div>
            <form className="form upload-form" action="" method="POST" onSubmit={(e) => e.preventDefault()}>
                <label id="audio-upload-label" htmlFor="audio-upload">Upload Audio</label>
                <input
                    type="file" 
                    id="audio-upload" 
                    name="audio-upload"
                    accept=".mp3,.wav"
                    placeholder="Upload Audio"
                    onChange={handleAddFile}
                    required
                />
                
                {curFile &&
                (
                    <div className="file-info">
                        <span>Name: {curFile.name}</span>
                        <span>Size: {curFile.size}</span>
                        <span>Length: {curFile.duration}</span>
                    </div>
                )}
                
            </form>
        </>
    )
}
