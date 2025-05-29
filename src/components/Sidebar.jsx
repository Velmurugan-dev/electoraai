import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Target, X, Menu } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, isMobile }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          className="mobile-menu-button"
          onClick={onToggle}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <h1 className="sidebar-title">ELECTORA</h1>
            <div className="sidebar-badge">TAMIL NADU</div>
            <div className="sidebar-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
          <button 
            className="sidebar-close" 
            onClick={onToggle}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav" role="navigation">
          <Link 
            to="/dashboard" 
            className={`nav-item ${location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}`}
            onClick={isMobile ? onToggle : undefined}
          >
            <div className="nav-icon">
              <TrendingUp size={20} />
            </div>
            <span className="nav-text">Voter Pulse Dashboard</span>
          </Link>
          
          <Link 
            to="/neutralizer" 
            className={`nav-item ${location.pathname === '/neutralizer' ? 'active' : ''}`}
            onClick={isMobile ? onToggle : undefined}
          >
            <div className="nav-icon">
              <Target size={20} />
            </div>
            <span className="nav-text">Campaign Neutralizer</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>Live Data</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;