import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {motion} from 'framer-motion'

export const Message = ({message}) => {
  const{currentUser}=useContext(AuthContext)



  return (
    <motion.div
  
    initial={{ scale: 0,opacity:0,y:22 }}
    animate={{ scale: 1,opacity:1,y:0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
    
    
    >
    
<Box sx={{display:'flex',gap:2,marginBottom:2,justifyContent:message?.sender?._id===currentUser?._id?"end":"start"
}}>
          <Avatar
          sx={{ width: 35, height: 35 }}
          alt={message?.sender?.name}
          src={message?.sender?.pic}
        />
        <Box >
            <Box sx={{background:'#9425F5',padding:2,borderRadius:2,color:'white',
            width:"fit-content"
        }}
          
          >
        <Typography fontSize={14}
        
        
        >{message?.content}</Typography>
            </Box>
        <Typography color='#999999' fontWeight={'bold'} fontSize={12} marginTop={1} component='p'>{formatDistanceToNow(new Date(message?.createdAt),{addSuffix:true})}</Typography>
        </Box>
    </Box>
    </motion.div>
    
)
}
