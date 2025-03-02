import { Menu as MenuIcon, ListAlt, Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/utils";
import "./TopBar.css";

const TopBar = ({sidebarToggle}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getUserData = (item) => item;

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="top-bar" style={{background : "grey"}}>
      <Box className="top-bar-wrapper">
        <IconButton className="menu-button" onClick={sidebarToggle}>
          <MenuIcon />
        </IconButton>
        <Box className="profile-section">
          <Typography
            variant="h6"
            onClick={handleMenuOpen}
            className="profile-name"
          >
            {getUserData("Name")}
          </Typography>
          <Avatar
            src={
              getUserData("UserImage") ||
              "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            }
            onClick={handleMenuOpen}
            className="profile-avatar"
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            className="profile-menu"
          >
            <MenuItem
              onClick={() => {
                navigate("/myTask");
                handleMenuClose();
              }}
            >
              <ListAlt className="menu-icon" /> My Task
            </MenuItem>
            <MenuItem
              onClick={() => {
                clearToken();
                navigate("/login");
                handleMenuClose();
              }}
            >
              <Logout className="menu-icon" /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </header>
  );
};

export default TopBar;
