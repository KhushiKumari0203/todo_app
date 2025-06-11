import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import Login from './pages/Login'; // ✅ NEW: import login page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />          {/* 👈 Default route: login */}
        <Route path="/home" element={<Home />} />       {/* 👈 Home after login */}
        <Route path="/add" element={<AddTask />} />     {/* 👈 Add Task page */}
        <Route path="/login" element={<Login />} />     {/* 👈 Explicit login route */}
      </Routes>
    </BrowserRouter>
  );
}
