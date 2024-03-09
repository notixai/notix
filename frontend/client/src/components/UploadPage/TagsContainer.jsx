import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

let curID = 1; //generates unique ids for tags
export default function TagsContainer({ tags, setTags }) {
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

	/* Tags container for AI prompt engineering */
	return (
		<div className="flex flex-auto flex-col gap-2 rounded bg-primary-theme px-2 py-2">
			{/* List of tags added */}
			<ul className="flex flex-row flex-wrap gap-2 pl-0">
				<TagList tags={tags} setTags={setTags} />
			</ul>
			{/* Input box to add new tags */}
			<input
				className="rounded border border-solid border-secondary-theme bg-primary-bg p-1 pl-3"
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

function TagList({ tags, setTags }) {
	return tags.map((tag) => (
		<Tooltip title={tag.tagName} placement="top" arrow>
			<li
				className="flex w-1/6 justify-between rounded bg-secondary-theme p-2 pl-1 text-white-font-200"
				key={tag.id}
			>
				<span className="whitespace-no-wrap overflow-hidden text-ellipsis">
					{tag.tagName}
				</span>
				<button
					className="bg-transparent border-0"
					onClick={() => {
						setTags((curTags) =>
							curTags.filter((curTag) => tag.id !== curTag.id),
						);
					}}
				>
					&times;
				</button>
			</li>
		</Tooltip>
	));
}
