import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { getSender } from "../helpers/chat";

export const Chat = ({ chat }) => {
  const { currentUser } = useContext(AuthContext);
  const { setSelectedChat, selectedChat } = useContext(ChatContext);

  let user = chat?.users?.filter((user) => user._id !== currentUser?._id);

  return (
    <Box
      onClick={() => setSelectedChat(chat)}
      sx={{
        cursor: "pointer",
        marginBottom: 1,
        padding: 1,
        background: chat?._id == selectedChat?._id && "#9425F5",
        color: chat?._id === selectedChat?._id && "#fff",
        borderRadius: 2,
        ":hover": {
          background: "#F3F3F3",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: "0 12px" }}>
        <Avatar
          sx={{ width: 50, height: 50 }}
          alt={user[0]?.name}
          src={user[0]?.pic}
        />
        <Box flex={1}>
          <Typography fontWeight={600} component="p">
            {!chat.isGroupChat
              ? getSender(currentUser, chat.users)
              : chat.chatName}
          </Typography>
          {/* {!chat?.isGroupChat?get} */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontWeight={"bold"} fontSize={14} component="p">
              {chat?.latestMessage?.sender?.name}
            </Typography>
            <Typography fontSize={14} component="p">
              {chat?.latestMessage?.content}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
