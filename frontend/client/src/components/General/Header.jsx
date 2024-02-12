import {
  Stack,
  ListItem,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import { useDrawer } from "../Contexts/DrawerContext";

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const { open, toggleDrawer } = useDrawer();

  return (
    <Stack direction="row" justifyContent="space-between">
      <ListItem sx={{ fontSize: "1.15rem", color: "var(--blue-font-400)" }}>
        <IconButton onClick={toggleDrawer}>
          <img src="img/menu-icon.png" alt="" width="30px"/>
        </IconButton>

        <ImageList>
          <ImageListItem sx={{ width: 30 }} cols={1}>
            <img src="img/upload-icon.png" alt="" />
          </ImageListItem>
        </ImageList>
        Notix
      </ListItem>
    </Stack>
  );
}
