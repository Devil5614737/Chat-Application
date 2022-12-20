import { Box, Button, FormControl, Input, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import { Message } from "./Message";
import { fetchMessasges, sendTheMessage } from "../api/request";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import ScrollableFeed from 'react-scrollable-feed';
import io from 'socket.io-client'
import { AuthContext } from "../context/AuthContext";
import {PaperAirplaneIcon} from '@heroicons/react/24/solid';
import {Spinner} from '../components/Spinner';


const ENDPOINT='https://chat-app-backend-2lpm.onrender.com';

var socket,selectedChatCompare


export const Messages = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { selectedChat,notification,setNotification,fetchAgain,setFetchAgain } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
const[loading,setLoading]=useState(false);
const[isLoading,setIsLoading]=useState(false)

  useEffect(()=>{
    socket=io(ENDPOINT);
    socket.emit("setup",currentUser);
  
  })




useEffect(()=>{
socket.on("message recieved",(newMessageRecieved)=>{
  if(!selectedChatCompare||selectedChatCompare?._id!==newMessageRecieved.chat._id){
if(!notification.includes(newMessageRecieved)){
  setNotification([...notification,newMessageRecieved]);
  setFetchAgain(!fetchAgain)
}
  }else{
    setMessages([...messages,newMessageRecieved])
  }
})
})

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setText("");
    try {
      const { data } = await sendTheMessage(text, selectedChat._id);
      setMessages([...messages, data]);
      socket.emit('new message',data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
    setFetchAgain(true)
  };



  const fetchMessage=async()=>{
    setLoading(true)
    if(!selectedChat) return 
    try {
      const {data}=await fetchMessasges(selectedChat?._id.toString())
      setLoading(false)
      setMessages(data);
      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


useEffect(()=>{
  fetchMessage();
  selectedChatCompare=selectedChat&&selectedChat
},[selectedChat])




  return (
    <Box >
      {loading&&
      <Spinner color='primary' size={30}/>
      }
      <Box sx={{ height: 415,overflow:'hidden' }}>
      {messages?.length<0?<Typography element='p'>No messages</Typography>:  
      <Box sx={{ height: 410, marginTop: 2, position: "relative" }}>
          <ScrollableFeed >
          {messages?.map((message,index)=>
          <Message key={message._id} message={message} messages={messages}
          index={index}
          />
            )}
          </ScrollableFeed>
        </Box>}
      </Box>
      <form onSubmit={sendMessage}  style={{ display: "flex",alignItems:'center',gap:'0 22px' }}>
        <Input
          value={text}
          
          sx={{ padding: 2,background:"#F3F3F3",borderRadius:5,width:'89%' }}
          disableUnderline
          placeholder="write a message"
          onChange={(e) => setText(e.target.value)}
        />

        <Button onClick={sendMessage} sx={{
          background:"#9425F5",
        width:'fit-content',
        paddingX:1,
        paddingY:2,
        borderRadius:3
        }} >
          {isLoading?<Spinner size={22} color='primary'/>:
          <PaperAirplaneIcon width={25} color='white' height={25}/>
          }
        </Button>
      </form>
    </Box>
  );
};
