import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import RepoImport from "./pages/RepoImport";
import NewScan from "./pages/NewScan";

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "radial-gradient(ellipse at 70% 40%, #101624 60%, #030711 100%)" }}
      >
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact" element={<NewScan />} />
            <Route path="/contact" element={<RepoImport />} />
              
            
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
