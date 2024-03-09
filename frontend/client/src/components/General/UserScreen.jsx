import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import { useState } from "react";

export default function UserScreen() {
	const [container, setContainer] = useState(null);
	return (
		<>
			<div
				ref={setContainer}
				className="absolute z-10 w-44 min-w-44"
			></div>
			<div className="grid h-full w-full grid-cols-1 grid-rows-layout">
				<Header container={container} />
				<main className="w-full max-w-lg self-center justify-self-center lg:max-w-2xl">
					<Outlet />
				</main>
			</div>
		</>
	);
}
