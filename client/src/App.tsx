import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import Login from './pages/Login'; // 👈 import Login

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* 👈 set as default */}
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}
