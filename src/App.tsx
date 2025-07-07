// src/App.tsx
import React from 'react';
import './App.css';
import ScanProgress from './components/ScanProgress';

const App: React.FC = () => {
  return (
    <div className="App">
      <ScanProgress />
    </div>
  );
};

export default App;