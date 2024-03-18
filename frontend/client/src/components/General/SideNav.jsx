import React from "react";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import { ImageList, ImageListItem, Stack } from "@mui/material";
// import { useDrawer } from "../Contexts/DrawerContext";
// import "../../../src/App.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function SideNav({ container }) {
	const [open, setOpen] = useState(false);
	const navOptions = [
		{
			heading: "Classes",
			links: [
				{ link: "Class 1", id: 1 },
				{ link: "Class 2", id: 2 },
				{ link: "Class 3", id: 3 },
			],
			id: 1,
		},
		{
			heading: "Notebook",
			links: [
				{ link: "Notebook 1", id: 1 },
				{ link: "Notebook 2", id: 2 },
				{ link: "Notebook 3", id: 3 },
			],
			id: 2,
		},
	];
	return (
		<Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
			<Dialog.Trigger>
				<img className="w-8" src="img/menu-icon.png" />
			</Dialog.Trigger>
			<AnimatePresence>
				{open && (
					<Dialog.Portal container={container} forceMount>
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "150px", opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
						>
							<Dialog.Content
								onInteractOutside={(event) =>
									event.preventDefault()
								}
								className="z-10 h-screen w-full overflow-hidden text-ellipsis bg-secondary-bg"
							>
								<nav className="flex flex-col gap-4 overflow-hidden whitespace-nowrap">
									<Dialog.Close className="mr-2 mt-2 w-auto self-end hover:cursor-pointer">
										<Cross1Icon />
									</Dialog.Close>
									<Dialog.Title>Navigate</Dialog.Title>
									<SideNavLinks navOptions={navOptions} />
								</nav>
							</Dialog.Content>
						</motion.div>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
function SideNavLinks({ navOptions }) {
	return navOptions.map((option) => {
		return (
			<ol className="pl-1">
				<h2>{option.heading}</h2>
				{option.links.map((link) => (
					<li key={link.id}>{link["link"]}</li>
				))}
			</ol>
		);
	});
}
function SideNav2() {
	const { open, toggleDrawer } = useDrawer();
	const drawerWidth = "175px";
	const buttonStyle = {
		width: "100%",
		color: "black",
		textAlign: "start",
		padding: "2px 10px",
		textTransform: "capitalize",
	};

	return (
		<Drawer
			className="bg-secondary-bg"
			variant="persistent"
			anchor="left"
			open={open}
			sx={{
				padding: "10px 30px",
				width: drawerWidth,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
				},
			}}
		>
			<Paper></Paper>
			<Stack direction="row" justifyContent="space-between">
				<ListItem
					sx={{ fontSize: "1.15rem", color: "var(--blue-font-400)" }}
				>
					<ImageList>
						<ImageListItem sx={{ width: 30 }} cols={1}>
							<img src="img/upload-icon.png" alt="" />
						</ImageListItem>
					</ImageList>
					Notix
				</ListItem>
				<Button
					sx={{
						fontSize: "1rem",
						textAlign: "end",
						marginRight: "5px",
						color: "var(--white-font-500)",
					}}
					onClick={toggleDrawer}
				>
					x
				</Button>
			</Stack>

			<List sx={{ paddingTop: "40px" }}>
				<ListItem
					sx={{
						fontSize: "1.5rem",
						fontWeight: "500",
						fontFamily: "Arbutus Slab",
						color: "var(--purple-font-300)",
					}}
				>
					Classes
				</ListItem>

				<ListItem>
					<Button sx={buttonStyle}>
						<ListItemText primary="Class 1" />
					</Button>
				</ListItem>

				<ListItem>
					<Button sx={buttonStyle}>
						<ListItemText primary="Class 2" />
					</Button>
				</ListItem>

				<ListItem>
					<Button sx={buttonStyle}>
						<ListItemText primary="Class 3" />
					</Button>
				</ListItem>
			</List>

			<List sx={{ paddingTop: "20px" }}>
				<ListItem
					sx={{
						fontSize: "1.5rem",
						fontWeight: "500",
						fontFamily: "Arbutus Slab",
						color: "var(--purple-font-300)",
					}}
				>
					Notebooks
				</ListItem>

				<ListItem>
					<Button sx={buttonStyle}>
						<ListItemText primary="Notebook 1" />
					</Button>
				</ListItem>

				<ListItem>
					<Button sx={buttonStyle}>
						<ListItemText primary="Notebook 2" />
					</Button>
				</ListItem>

				<ListItem>
					<Button sx={buttonStyle}>
						<ListItemText primary="Notebook 3" />
					</Button>
				</ListItem>
			</List>
		</Drawer>
	);
}

export default SideNav;
