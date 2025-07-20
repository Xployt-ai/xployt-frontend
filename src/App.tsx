import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NewScan from "./pages/NewScan";
import IssueDetail from "./pages/IssueDetail";


import Successful from "./pages/Successful";


import Dashboard from "./pages/Dashboard";
import Bill from "./pages/Bill";
import ScanningPage from "./pages/ScanningPage";


function App() {
  return (
    <BrowserRouter>
      <main className="flex-1">
        <Routes>

          <Route path="/" element={<Home />} />

<<<<<<< HEAD
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
=======
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new-scan" element={<NewScan />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/successful" element={<Successful />} />
             <Route path="/repo-import" element={<RepoImport />} />
                 <Route path="/issuedetail" element={<IssueDetail />} />
              

             
            
            <Route path="/bill" element={<Bill />} />
>>>>>>> madushika


        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
