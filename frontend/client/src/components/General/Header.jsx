import * as Avatar from "@radix-ui/react-avatar";
import SideNav from "./SideNav.jsx";

export default function Header({ container }) {
	return (
		<header className="flex h-auto flex-row items-center justify-between gap-3 px-4 py-2">
			<SideNav container={container} />
			<img src="img/upload-icon.png" alt="" className="w-8" />
			Notix
			<Avatar.Root className="ml-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full object-cover">
				<Avatar.Image
					className="h-full w-full rounded-full"
					src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
				/>
				<Avatar.Fallback
					className="flex h-full w-full items-center justify-center rounded-full bg-primary-theme text-white-font-100"
					delayMs={500}
				>
					Name
				</Avatar.Fallback>
			</Avatar.Root>
		</header>
	);
}
