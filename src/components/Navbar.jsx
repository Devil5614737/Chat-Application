import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const settings = ["Logout"];

export const Navbar = ({ handleOpenSideBar, setShowChats }) => {
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);
  const { notification,newMessage } = React.useContext(ChatContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Link to='/dashboard' style={{textDecoration:"none",color:"#9426F5"}}>
        <Typography
            variant="h6"
            noWrap
            component="p"
          
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Conversate
          </Typography>
        </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                setShowChats((prev) => prev != true);
                handleOpenSideBar;
              }}
              color="inherit"
            >
              <Bars3Icon width={25} height={25} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0, gap: 3, display: "flex" }}>
            <Badge
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            badgeContent={notification?.length}
            color='primary'
            >
              <IconButton>
                <BellIcon style={{ width: 22, height: 22 }} color="black" />
              </IconButton>
            </Badge>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser?.name} src={currentUser?.pic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu(), handleLogout();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          {notification?.length>0&&
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {notification?.map(ntfc=>
            <MenuItem key={ntfc._id}>New message from {ntfc?.sender?.name}</MenuItem>
              )}
          </Menu>
          }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
