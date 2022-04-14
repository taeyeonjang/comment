import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from './views/ChatPage/ChatPage';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import NavBar from './views/NavBar/NavBar';
import RegisterPage from './views/RegisterPage/RegisterPage';



function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
    <Route path ="/" element = {<LandingPage />} />
    <Route path ="/login" element = {<LoginPage />} />
    <Route path ="/chat" element = {<ChatPage />} />
    <Route path ="/register" element = {<RegisterPage />} />
  
    </Routes>

    </BrowserRouter>



  );
}
//auth 사용법,.........
export default App;
