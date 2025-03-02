import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { sideBarNavigation } from '../../utils/sideBarNavigation'
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <>
    <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: '20px', left: '20px' }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          {sideBarNavigation.map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon>
                {/* Dynamically import Material-UI icons */}
                {React.createElement(item.icon)}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      </>
  )
}

export default LeftSidebar