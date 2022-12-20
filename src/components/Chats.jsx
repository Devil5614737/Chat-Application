import { Box, FormControl, Input, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Chat } from "./Chat";
import { ChatContext } from "../context/ChatContext";
import { fetchChats } from "../api/request";

export const Chats = ({ handleOpen, showChats }) => {
  const { setChats, chats,fetchAgain,setFetchAgain,setSelectedChat } = useContext(ChatContext);

  const fetchingTheChats = async () => {
    try {
      const { data } = await fetchChats();
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingTheChats();
    return ()=>setFetchAgain(false)
  }, [fetchAgain]);




  return (
    <Box
      sx={{
        flex: 1,
        background: "white",
        borderRadius: 4,
        display: {
          xs: showChats ? "block" : "none",
          md: "block",
          border: "1px solid #d7d7d7",
        },
        padding: 2,
      }}
    >
      <Typography variant="h5" component="p" fontSize={18} fontWeight="bold">
        Chats
      </Typography>
      <FormControl
        onClick={handleOpen}
        sx={{
          marginTop: 2,
          background: "#F3F3F3",
          padding: 1,
          borderRadius: 3,
        }}
        fullWidth
      >
        <Input fullWidth placeholder="search users" disableUnderline />
      </FormControl>
      <Box sx={{ marginTop: 2, height: 425, overflowY: "auto" }}>
        {chats?.map((chat) => (
          <Chat key={chat._id} chat={chat}/>
        ))}
      </Box>
    </Box>
  );
};
