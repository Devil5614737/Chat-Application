import { FormControl, Input, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React,{useState} from 'react';
import { useContext } from 'react';
import {createChat, searchUsers} from '../api/request';
import { ChatContext } from '../context/ChatContext';
import { User } from './User';
import {Spinner} from './Spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const SearchUserModal = ({open,handleClose}) => {
  const{setFetchAgain,setSelectedChat,setChats,chats}=useContext(ChatContext)
  const[query,setQuery]=useState("");
  const[searchResult,setSearchResult]=useState([])
  const[loading,setLoading]=useState(false)

  const handleSearch=async(e)=>{
e.preventDefault();
setLoading(true)
try {
  const {data}=await searchUsers(query)
  setSearchResult(data);
  setLoading(false)
} catch (error) {
  console.log(error)
  setLoading(false)
}
setQuery("")
  }

const handleSelectUser=async(userId)=>{
  try {
const {data}=await createChat(userId);

if(!chats.find((chat)=>chat._id!==data._id)) setChats([...chats,data]);
setSelectedChat(data)

} catch (error) {
  console.log(error)
}
handleClose()
setFetchAgain(true);
}


  return (
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography fontWeight='bold' id="modal-modal-title" variant="h6" component="h2">
      Search Users
    </Typography>
    <form
    onSubmit={handleSearch}
        style={{
          marginTop: 12,
          background: "#F3F3F3",
          padding: 6,
          borderRadius: 6,
          width:'100%'
        }}
      >
        <Input fullWidth placeholder="search users" disableUnderline value={query} onChange={(e)=>setQuery(e.target.value)} />
      </form>
      {loading?
    <Spinner size={23} color='primary'/>:
    <Box sx={{marginTop:2,height:425,overflowY:"auto",
    
    
    }}>
    {searchResult?.map(user=>
    <User key={user._id} user={user} handleSelectUser={handleSelectUser}/>
      )}
  </Box>
      }
  </Box>
</Modal>
  )
}
