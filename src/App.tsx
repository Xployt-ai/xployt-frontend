import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// @ts-ignore
import Successful from "./pages/Successful.jsx";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Successful />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
