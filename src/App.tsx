import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import RepoImport from "./pages/RepoImport";
import NewScan from "./pages/NewScan";

import Successful from "./pages/Successful";


import Dashboard from "./pages/Dashboard";
import Bill from "./pages/Bill";

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

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new-scan" element={<NewScan />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/successful" element={<Successful />} />
             <Route path="/repo-import" element={<RepoImport />} />
             
            
            <Route path="/bill" element={<Bill />} />

    

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
