import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CampaignNeutralizer from './components/CampaignNeutralizer';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/neutralizer" element={<CampaignNeutralizer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;