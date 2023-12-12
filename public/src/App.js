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
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
