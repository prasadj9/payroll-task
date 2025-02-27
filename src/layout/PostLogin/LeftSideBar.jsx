import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { sideBarNavigation } from '../../utils/sideBarNavigation'

const LeftSidebar = () => {
  return (
    <Drawer variant='persistent' anchor='left' open sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}>
        <List>
            {sideBarNavigation.map((item, index) => (
                <ListItem button key={index}>
                    
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText primary={item?.name} />
                </ListItem>
            ))}
        </List>
    </Drawer>
  )
}

export default LeftSidebar