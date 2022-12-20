
import React from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import Signup from './pages/Signup';
import { ThemeProvider } from './styles/ThemeProvider';
import {Routes,Route} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContext, ChatContextProvider } from './context/ChatContext';

function App() {
  return (
  <>
  <ThemeProvider>
    <AuthContextProvider>
    <ChatContextProvider>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </ChatContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
  </>
  )
}

export default App