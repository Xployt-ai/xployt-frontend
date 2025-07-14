import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Successful from "./pages/Successful";
import RepoImport from "./pages/RepoImport";
import NewScan from "./pages/NewScan";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewScan  />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
