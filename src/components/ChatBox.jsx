import { Avatar, Box, Typography } from '@mui/material'
import React,{useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { otherUser } from '../helpers/chat'
import { Messages } from './Messages'

export const ChatBox = () => {
const {selectedChat}=useContext(ChatContext);
const {currentUser}=useContext(AuthContext);



  return (
    <Box sx={{flex:3,background:'white',borderRadius:4,padding: 2,border:'1px solid #d7d7d7',display:!selectedChat&&'none'}}>
      <Box sx={{display:'flex',alignItems:'center',gap:1}}>
      <Avatar
          sx={{ width: 50, height: 50 }}
          alt="Remy Sharp"
          src={otherUser(selectedChat,currentUser)?.pic}
        />
        <Typography fontWeight={'bold'} component={'p'}>{otherUser(selectedChat,currentUser)?.name}</Typography>
      </Box>
      <Messages/>
    </Box>
  )
}
