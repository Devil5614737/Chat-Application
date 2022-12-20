import { Box, Drawer } from '@mui/material'
import React, { useState } from 'react';
import { Chats } from './Chats';


export const ChatsSidebar = ({openSideBar,handleCloseSideBar,handleOpen}) => {
  return (
  <Drawer
    anchor={'left'}
    open={openSideBar}
    onClose={handleCloseSideBar}
  >
    <Box sx={{width:300}}>
    <Chats handleOpen={handleOpen} />
    </Box>
  </Drawer>
  )
}
