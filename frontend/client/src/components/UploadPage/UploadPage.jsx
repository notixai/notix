import {useState} from 'react'
let curID = 1;  //generates unique ids for tags
/**
 * @todo Persist file if user presses cancel
 * @todo Add styling to page
 * @todo Fix handleFormSubmit
 * @todo Modularize Code into more components
 * @todo Calculate duration of audio file
 * @todo Add HTML sanitization to input
 * @todo Add success and fail to submit
 */

/**
 * 
 * Upload Page Component for the app
 */
export default function UploadPage(){
    const [tags,setTags] = useState([]);        //Holds all the tags the user has
    const [newTag, setNewTag] = useState('')    //Holds the new tag the user wants
    const [curFile, setCurFile] = useState(''); //Holds the current file selected
    const maxFileSize=500000000;    //Max size for files (roughly 500 MBs)
    /**
     * 
     * @param {event} e 
     * Takes the input from the label-input and appends it to the other tags
     */
    function handleAddTag(e){
        //If the user pressed enter or left the input box
        if((e.type === 'keydown' && e.key === 'Enter') || e.type==='blur')
        {
            //If the input box isn't empty
            if(newTag.trim())
            {
                setTags([...tags,{id: curID++, tagName:newTag}]);
                setNewTag('');
            }        
        }
    }

    /**
     * 
     * @param {event} e 
     * If a file exists, this function places the file in the curFile variable if
     * the size is less than the max file size
     */
    function handleAddFile(e){
        //If a file has been uploaded
        if(e.target.files)
        {
            //Check to see if the size is below the required size
            if(e.target.files[0].size > maxFileSize)
            {
                console.log("Error: Too Large!")
            }
            else
            {
                setCurFile(e.target.files[0])
            }
        }
    }

    /**
     * 
     * @param {event} e 
     * If an audio file has been uploaded, when the user submit the form
     * this function sends the audio file and the tags to the backend
     */
    async function handleFormSubmit(e){
        e.preventDefault(); //Stop the form from naturally submitting
        
        try{
            const formData = new FormData();
            formData.append("audio",curFile);
            formData.append("tags",tags);
            console.log(formData);
            const response = await fetch('http://server:5000/upload-audio', {
                method: "POST",
                body: formData
            })
            const result = response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Failed!");
        }
        
    }

    /**
     * Converts the size of the file into an equivalent size equivalent with smaller numbers
     * @param {number} size 
     */
    function calculateSize(size){
        //The conversions are roughly the power relative to bytes
        let conversions = [{unit: "B", value:1}, {unit:"KB", value:1000}, {unit:"MB", value:1000000}, {unit:"GB", value:1000000000}];
        let index;
        //Traverse the different conversions to see which one is best
        for(index = 1; index < conversions.length; index++)
        {
            //If the current conversion value is greater than the size,
            //we need to use the conversion before this
            if(size / conversions[index]['value'] < 1)
            {
                let suitableConversion = conversions[index-1];
                return `${(size/suitableConversion['value']).toFixed(2)} ${suitableConversion['unit']}`;
            } 
        }

        //GBs as fallback if the size is bigger than all the other conversions
        let suitableConversion = conversions[index-1];
        return `${(size/suitableConversion['value']).toFixed(2)} ${suitableConversion['unit']}`;
    }
    return(
        <>
            {/* Tags container for AI prompt engineering */}
            <div className="tags-container">
                {/* List of tags added */}
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
                {/* Input box to add new tags */}
                <input 
                    id="tag-input"
                    name="tag-input" 
                    type="text" 
                    placeholder="Add Tag" 
                    value={newTag}
                    onBlur={handleAddTag} 
                    onKeyDown={handleAddTag}
                    onChange={ (e) => {setNewTag(e.target.value)}}
                />
            </div>
            {/* Form to upload audio */}
            <form className="form upload-form" method="POST" onSubmit={handleFormSubmit} encType='multipart/form-data'>
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
                {/* If a file is uploaded, show the metadata */}
                {curFile !== '' &&
                (
                    <div className="file-info">
                        <span>Name: {curFile.name}</span>
                        <span>Size: {calculateSize(curFile.size)}</span>
                        <span>Length: {curFile.duration}</span>
                    </div>
                )}
                <input type="submit" value="submit"/>
            </form>
        </>
    )
}
