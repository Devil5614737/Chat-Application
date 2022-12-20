import { createContext, useState } from "react";

export const ChatContext=createContext({});


export const ChatContextProvider=({children})=>{
    const [chats,setChats]=useState([]);
    const [selectedChat,setSelectedChat]=useState();
    const[fetchAgain,setFetchAgain]=useState(false);
    const[notification,setNotification]=useState([]);
    const[newMessage,setNewMessage]=useState()

    return (
        <ChatContext.Provider value={{chats,setChats,selectedChat,setSelectedChat,fetchAgain,setFetchAgain,
            notification,setNotification,
            newMessage,setNewMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
}