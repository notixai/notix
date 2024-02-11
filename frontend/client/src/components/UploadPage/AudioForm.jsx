import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

let curID = 1; //generates unique ids for tags
/**
 * @todo Persist file if user presses cancel
 * @todo Add styling to page
 * @todo Modularize Code into more components
 * @todo Calculate duration of audio file
 * @todo Add HTML sanitization to input
 */

/**
 *
 * Upload Page Component for the app
 */
export default function AudioForm() {
  const [tags, setTags] = useState([]); //Holds all the tags the user has
  return (
    <div className="audio-page-container">
      {/* Form to upload audio */}
      <Tags tags={tags} setTags={setTags} />
      <AudioSubmitArea tags={tags} />
    </div>
  );
}
function AudioSubmitArea({ tags }) {
  const maxFileSize = 500000000; //Max size for files (roughly 500 MBs)
  const [curFile, setCurFile] = useState(null); //Holds the current file selected
  const navigate = useNavigate();
  /**
   *
   * @param {event} e
   * If a file exists, this function places the file in the curFile variable if
   * the size is less than the max file size
   */
  function handleAddFile(e) {
    //If a file has been uploaded
    if (e.target.files && e.target.files[0]) {
      //Check to see if the size is below the required size
      if (e.target.files[0].size > maxFileSize) {
        console.log("Error: Too Large!");
      } else {
        setCurFile(e.target.files[0]);
      }
    }
  }
  /**
   *
   * @param {event} e
   * If an audio file has been uploaded, when the user submit the form
   * this function sends the audio file and the tags to the backend
   */
  async function handleFormSubmit(e) {
    e.preventDefault(); //Stop the form from naturally submitting

    try {
      const formData = new FormData();
      formData.append("audio-upload", curFile);
      const tagNames = tags.map((tag) => tag.tagName);
      formData.append("tags", tagNames);
      const response = await fetch("http://localhost:5000/api/upload-audio", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      /**
       * @todo Add success and fail to submit
       */
      if (result === 200) navigate("/success");
      else navigate("/failure");

      console.log("Success:", result);
    } catch (error) {
      console.error("Failed!");
    }
  }
  return (
    <form
      className="form upload-form"
      method="POST"
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
    >
      <label id="audio-upload-label" htmlFor="audio-upload">
        {curFile ? (
          <FileData curFile={curFile} />
        ) : (
          <>
            <img
              id="upload-icon"
              src="img/upload-icon.png"
              alt="Upload Icon"
            ></img>
            <h2 id="audio-upload-heading">Upload Audio</h2>
            <h3 id="audio-upload-type">wav,mp3</h3>
            <h4 id="audio-upload-size">Max Size: 500Mbs</h4>
          </>
        )}
      </label>
      <input
        type="file"
        id="audio-upload"
        name="audio-upload"
        accept=".mp3,.wav"
        placeholder="Upload Audio"
        onChange={handleAddFile}
        required
        hidden
      />
      {/* If a file is uploaded, show the metadata */}

      <div className="submit-container">
        <input id="audio-submit" type="submit" value="Submit" />
      </div>
    </form>
  );
}

function FileData({ curFile }) {
  /**
   * Converts the size of the file into an equivalent size equivalent with smaller numbers
   * @param {number} size
   */
  function calculateSize(size) {
    //The conversions are roughly the power relative to bytes
    let conversions = [
      { unit: "B", value: 1 },
      { unit: "KB", value: 1000 },
      { unit: "MB", value: 1000000 },
      { unit: "GB", value: 1000000000 },
    ];
    let index;
    //Traverse the different conversions to see which one is best
    for (index = 1; index < conversions.length; index++) {
      //If the current conversion value is greater than the size,
      //we need to use the conversion before this
      if (size / conversions[index]["value"] < 1) {
        let suitableConversion = conversions[index - 1];
        return `${(size / suitableConversion["value"]).toFixed(2)} ${
          suitableConversion["unit"]
        }`;
      }
    }
    //GBs as fallback if the size is bigger than all the other conversions
    let suitableConversion = conversions[index - 1];
    return `${(size / suitableConversion["value"]).toFixed(2)} ${
      suitableConversion["unit"]
    }`;
  }

  return (
    <>
      <div className="audio-center">
        <img className="audio-wave" src="img/upload-icon.png" alt="" />
        <span className="file-name">Audio Name: {curFile.name}</span>
      </div>
      <div className="file-metadata">
        <span>Size: {calculateSize(curFile.size)}</span>
        <span>Type: {curFile.type}</span>
      </div>
    </>
  );
}
function Tags({ tags, setTags }) {
  const [newTag, setNewTag] = useState(""); //Holds the new tag the user wants
  /**
   *
   * @param {event} e
   * Takes the input from the label-input and appends it to the other tags
   */
  function handleAddTag(e) {
    //If the user pressed enter or left the input box
    if ((e.type === "keydown" && e.key === "Enter") || e.type === "blur") {
      //If the input box isn't empty
      if (newTag.trim()) {
        setTags([...tags, { id: curID++, tagName: newTag }]);
        setNewTag("");
      }
    }
  }

  {
    /* Tags container for AI prompt engineering */
  }
  return (
    <div className="tags-container">
      {/* List of tags added */}
      <ul id="tag-list">
        {tags.map((tag) => (
          <Tooltip title={tag.tagName} placement="top" arrow>
            <li className="tag" key={tag.id}>
              <span>{tag.tagName}</span>
              <button
                className="button remove-tag-button"
                onClick={() => {
                  setTags((curTags) =>
                    curTags.filter((curTag) => tag.id != curTag.id)
                  );
                }}
              >
                &times;
              </button>
            </li>
          </Tooltip>
        ))}
      </ul>
      {/* Input box to add new tags */}
      <input
        id="tag-input"
        name="tag-input"
        type="text"
        placeholder="Add Tag..."
        value={newTag}
        onBlur={handleAddTag}
        onKeyDown={handleAddTag}
        onChange={(e) => {
          setNewTag(e.target.value);
        }}
      />
    </div>
  );
}
