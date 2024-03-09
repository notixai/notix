import { useState } from "react";
import TagsContainer from "./TagsContainer.jsx";
import AudioForm from "./AudioForm.jsx";

/**
 * @todo Modularize Code into more components
 * @todo Add HTML sanitization to input
 */

/**
 *
 * Upload Page Component for the app
 */
export default function AudioPage() {
	const [tags, setTags] = useState([]); //Holds all the tags the user has
	return (
		<div className="flex flex-col gap-1">
			{/* Form to upload audio */}
			<TagsContainer tags={tags} setTags={setTags} />
			<AudioForm tags={tags} />
		</div>
	);
}
