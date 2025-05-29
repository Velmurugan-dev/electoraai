import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Target, X } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <h1 className="sidebar-title">ELECTORA</h1>
          <div className="sidebar-badge">TAMIL NADU</div>
          <div className="sidebar-date">
            Wednesday, May 28, 2025
          </div>
        </div>
        <button className="sidebar-close" onClick={onToggle}>
          <X size={20} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={`nav-item ${location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <TrendingUp size={20} />
          </div>
          <span className="nav-text">Voter Pulse Dashboard</span>
        </Link>
        
        <Link 
          to="/neutralizer" 
          className={`nav-item ${location.pathname === '/neutralizer' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <Target size={20} />
          </div>
          <span className="nav-text">Campaign Neutralizer</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;