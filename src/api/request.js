import axios from "axios";

const BASE_URL='https://chat-app-backend-2lpm.onrender.com/api';
const headers={
    'x-auth-token':localStorage.getItem('token')
}

const login=(email,password)=>axios.post(`${BASE_URL}/login`,{email,password})
const signup=(name,email,password,pic)=>axios.post(`${BASE_URL}/signup`,{name,email,password,pic})
const searchUsers=(query)=>axios.get(`${BASE_URL}/search-users?search=${query}`,{headers});


const fetchChats=()=>axios.get(`${BASE_URL}/fetch-chats`,{headers});



const createChat=(userId)=>axios.post(`${BASE_URL}/create-chat`,{userId},{headers})


const sendTheMessage=(content,chatId)=>axios.post(`${BASE_URL}/send-message`,{content,chatId},{headers})

// http://localhost:4000/api/fetch-messages?search=63a076884bd9d3c42fa389fb

const fetchMessasges=(chatId)=>axios.get(`${BASE_URL}/fetch-messages?search=${chatId}`,{headers})


export {login,signup,searchUsers,fetchChats,createChat,sendTheMessage,fetchMessasges}