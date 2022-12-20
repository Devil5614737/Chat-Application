import { Box, Container } from '@mui/material'
import React, { useState } from 'react'
import { ChatBox } from '../components/ChatBox'
import { Chats } from '../components/Chats'
import { ChatsSidebar } from '../components/ChatsSidebar'
import { Navbar } from '../components/Navbar'
import { SearchUserModal } from '../components/SearchUserModal'

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [showChats,setShowChats] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenSideBar=()=>setOpenSideBar(true)
  const handleCloseSideBar=()=>setOpenSideBar(false)
  return (
    <>
    <Navbar setShowChats={setShowChats} handleOpenSideBar={handleOpenSideBar}/>
    <Container maxWidth='xl'>
      <Box sx={{marginTop:2,height:'85vh',display:'flex',gap:2}}>
        <Chats handleOpen={handleOpen} showChats={showChats}/>
        <ChatBox/>
      </Box>
    </Container>
    <SearchUserModal handleClose={handleClose} open={open}/>
    <ChatsSidebar  openSideBar={openSideBar} handleCloseSideBar={handleCloseSideBar} handleOpen={handleOpen}/>
    </>
  )
}

export default Dashboard