import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ImageList, ImageListItem, Stack } from "@mui/material";
import { useDrawer } from "../Contexts/DrawerContext";
import "../../../src/App.css";

function SideNav() {
  const { open, toggleDrawer } = useDrawer();
  const drawerWidth = "175px";
  const buttonStyle = {
    width: "100%",
    color: "black",
    textAlign: "start",
    padding: "2px 10px",
    textTransform: "lowercase",
    // eslint-disable-next-line no-dupe-keys
    textTransform: "capitalize",
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        padding: "10px 30px",
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "var(--secondary-bg)",
        },
      }}
    >
      <Paper></Paper>
      <Stack direction="row" justifyContent="space-between">
        <ListItem sx={{ fontSize: "1.15rem", color: "var(--blue-font-400)" }}>
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
