import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componet/Pages/Home';
import SinglePost from './Componet/Pages/SinglePost';
import CreatePost from './Componet/Pages/CreatePost';
import Login from './Componet/Pages/Login';
import Register from './Componet/Pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router> 
  );
}

export default App;
