import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Successful from "./pages/Successful.tsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Successful />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
