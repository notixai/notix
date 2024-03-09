import { Link } from "react-router-dom";
export default function Home() {
	return (
		<>
			<h1>Welcome</h1>
			<div className="flex flex-col items-center gap-2">
				<Link to={"upload-audio"}>Upload Page</Link>
				<Link to={"transcripts"}>View Transcripts</Link>
				<Link to={"summaries"}>See Summaries</Link>
			</div>
		</>
	);
}
