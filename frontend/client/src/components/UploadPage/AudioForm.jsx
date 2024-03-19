import { useState } from "react";
import { useNavigate, Form } from "react-router-dom";

export default function AudioForm({ tags }) {
	const maxFileSize = 500000000; //Max size for files (roughly 500 MBs)
	const [curFile, setCurFile] = useState(null); //Holds the current file selected
	const navigate = useNavigate();

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

	async function handleFormSubmit(e) {
		e.preventDefault(); //Stop the form from naturally submitting

		//If a file has not been selected
		if (curFile === null) {
			return;
		}

		try {
			//Create FormData Object and add files and tags to it to post
			const formData = new FormData();
			formData.append("audio-upload", curFile);
			const tagNames = tags.map((tag) => tag.tagName);
			formData.append("tags", tagNames);

			//Post FormData
			const response = await fetch("http://localhost:5000/upload-audio", {
				method: "POST",
				body: formData,
			});
			/**
			 * @todo Add success and fail to submit
			 */
			console.log(response);
			const result = await response.json();
			//Send message based on if it was successful or not
			if (response.status === 200) {
				console.log(result);
				navigate("/success", {
					state: {
						title: "Success",
						status: "success",
						message: result.message,
					},
				});
			} else {
				navigate("/failure", {
					state: {
						title: "Failure",
						status: "failure",
						message: result.message,
					},
				});
			}
		} catch (error) {
			console.error("Failed!");
			navigate("/failure", {
				state: {
					title: "Failure",
					status: "failure",
					message: error.message,
				},
			});
		}
	}
	return (
		<Form
			className="form upload-form"
			method="POST"
			onSubmit={handleFormSubmit}
			navigate={false}
			encType="multipart/form-data"
		>
			<label
				className="flex w-full flex-col items-center justify-center border-2 border-dashed border-secondary-theme bg-secondary-bg  pt-20 hover:cursor-pointer"
				htmlFor="audio-upload"
			>
				{curFile ? (
					<FileData curFile={curFile} />
				) : (
					<DefaultAudioLabel />
				)}
			</label>
			<input
				type="file"
				id="audio-upload"
				name="audio-upload"
				accept=".mp3,.wav"
				placeholder="Upload Audio"
				onChange={handleAddFile}
				hidden
			/>
			{/* If a file is uploaded, show the metadata */}
			<div className="flex justify-center sm:justify-end">
				<input
					className="mt-2 rounded bg-secondary-theme px-4 py-1 text-white-font-100 hover:cursor-pointer"
					type="submit"
					value="Submit"
				/>
			</div>
		</Form>
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
			<div className="m-auto flex flex-col items-center">
				<img
					className="w-3/5"
					src="img/sound-wave-icon.png"
					alt="Sound Wave"
				/>
				<span className="mt-1 text-center text-lg text-blue-font-300">
					Audio Name: {curFile.name}
				</span>
			</div>
			<div className="flex w-full items-end justify-between px-5 py-1 text-white-font-500">
				<span>Size: {calculateSize(curFile.size)}</span>
				<span>Type: {curFile.type}</span>
			</div>
		</>
	);
}

function DefaultAudioLabel() {
	return (
		<>
			<img
				className="w-20"
				src="img/upload-icon.png"
				alt="Upload Icon"
			></img>
			<h2 className="text-blue-font-300">Upload Audio</h2>
			<h3 className="text-purple-font-400">wav,mp3</h3>
			<h4 className="pb-2 text-purple-font-500">Max Size: 500Mbs</h4>
		</>
	);
}
