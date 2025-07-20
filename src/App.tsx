import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewScan from "./pages/NewScan";
import Sucessful from "./pages/Successful";
import Dashboard from "./pages/Dashboard";
import Bill from "./pages/Bill";
import ScanningPage from "./pages/ScanningPage";
import SecurityDashboardPage from "./pages/SecurityDashboardPage";


function App() {
  return (
    <BrowserRouter>
      <main className="flex-1">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/NewScan" element={<NewScan />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/successful" element={<Sucessful />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/scanning" element={<ScanningPage />} />
          <Route path="/securitydashboard" element={<SecurityDashboardPage />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
