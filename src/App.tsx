import { BrowserRouter, Routes, Route } from 'react-router-dom';



import About from './pages/About';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NewScan from './pages/NewScan';
import IssueDetail from './pages/IssueDetail';
import RepoImport from './pages/RepoImport';
import Usage from './pages/Usage';

import Successful from './pages/Successful';

import Dashboard from './pages/Dashboard';
import Bill from './pages/Bill';
import ScanningPage from './pages/ScanningPage';
import UNavBar from '@/components/UNavBar.tsx';


import SecurityDashboardPage from './pages/SecurityDashboardPage';
import GitHubCallback from './pages/GitHubCallback';

function App() {
  return (
    <BrowserRouter>
      <main className="flex-1">
        <UNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/new-scan/:repo_name" element={<NewScan />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/successful" element={<Successful />} />
          <Route path="/repo-import" element={<RepoImport />} />
          <Route path="/issuedetail" element={<IssueDetail />} />
          <Route path="/scanning/:scan_id" element={<ScanningPage />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/securitydashboard/:scan_id" element={<SecurityDashboardPage />} />
          <Route path="/callback" element={<GitHubCallback />} />
          <Route path="/usage" element={<Usage />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;