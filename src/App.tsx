import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Successful from "./pages/Successful.tsx";
import Dashboard from "./pages/dashboard/index.tsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Successful/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
