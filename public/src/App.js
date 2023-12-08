import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
