import React from 'react';
import ReactDOM from 'react-dom/client';
// main.tsx
import './index.css'; // ✅ This line is required

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);