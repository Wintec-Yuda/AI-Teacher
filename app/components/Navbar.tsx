'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: 'Home', link: '/' },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
        >
          MyApp
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item) => (
            <Button key={item.label} color="inherit" href={item.link}>
              {item.label}
            </Button>
          ))}
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <IconButton sx={{ display: 'flex', justifyContent: 'end' }}>
                <CloseIcon />
              </IconButton>
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton component="a" href={item.link}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
