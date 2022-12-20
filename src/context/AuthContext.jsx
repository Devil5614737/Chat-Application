import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext({})



export const AuthContextProvider=({children})=>{
    const[currentUser,setCurrentUser]=useState(null);


    useEffect(()=>{
const token=localStorage.getItem('token');
if(token){
    const decoded=jwtDecode(token)
    setCurrentUser(decoded)
}
    },[])

    return (
        <AuthContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}