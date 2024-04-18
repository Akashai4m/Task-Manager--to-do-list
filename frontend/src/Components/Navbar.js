//Import Dependencies required For Navbar

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

//Navbar Component Main Function

export default function MenuAppBar() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);

      //Define Navigate For Routing
  const navigate = useNavigate();

  
     //Menu When Click On User Profile
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

      //For Closing Menu Of User Logged In
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.setItem('token' ,'');
    navigate('/');
    
  };
        
  //Token Value Of User Logged In
  const tokenvalue = localStorage.getItem('token') ;

  console.log(tokenvalue) ;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'black' ,color:"white"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Action Planner</Typography>
          {tokenvalue && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" sx={{ width: 60, height: 60 }} src='user.jpg' />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem><br/>
                <MenuItem onClick={handleClose}> Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
