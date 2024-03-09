import {
	Stack,
	ListItem,
	ImageList,
	ImageListItem,
	IconButton,
} from "@mui/material";
import { useDrawer } from "../Contexts/DrawerContext";
import * as Avatar from "@radix-ui/react-avatar";
import SideNav from "./SideNav.jsx";
export default function Header({ container }) {
	// eslint-disable-next-line no-unused-vars
	const { open, toggleDrawer } = useDrawer();

	return (
		<Stack direction="row" justifyContent="space-between">
			<ListItem
				sx={{ fontSize: "1.15rem", color: "var(--blue-font-400)" }}
			>
				<SideNav container={container} />
				<ImageList>
					<ImageListItem sx={{ width: 30 }} cols={1}>
						<img src="img/upload-icon.png" alt="" />
					</ImageListItem>
				</ImageList>
				Notix
			</ListItem>
			<ListItem>
				<Avatar.Root className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full object-cover">
					<Avatar.Image
						className="h-full w-full rounded-full"
						src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
					/>
					<Avatar.Fallback
						className="flex h-full w-full items-center justify-center rounded-full bg-primary-theme text-white-font-100"
						delayMs={500}
					>
						ss
					</Avatar.Fallback>
				</Avatar.Root>
			</ListItem>
		</Stack>
	);
}
