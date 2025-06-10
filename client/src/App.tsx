import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // ✅ Only Home page is needed
import AddTask from './pages/AddTask'; // 👈 import it

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} /> {/* 👈 add this route */}
      </Routes>
    </BrowserRouter>
  );
}

