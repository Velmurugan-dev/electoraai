import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageSquare, Target, AlertTriangle, Menu, RefreshCw } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const Dashboard = ({ isMobile, onMenuToggle }) => {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const colors = {
    primary: '#4ade80',
    negative: '#ef4444',
    neutral: '#60a5fa',
    accent: '#7c3aed',
    secondary: '#ea580c',
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1500);
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trendDirection, isLoading }) => (
    <div className={`stat-card ${isLoading ? 'loading' : ''}`}>
      <div className="stat-card-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className={`stat-subtitle ${trendDirection === 'up' ? 'trend-up' : trendDirection === 'down' ? 'trend-down' : ''}`}>
              {trendDirection === 'up' && '↗ '}
              {trendDirection === 'down' && '↘ '}
              {subtitle}
            </p>
          )}
        </div>
        <div className="stat-icon">
          <Icon size={isMobile ? 20 : 24} />
        </div>
      </div>
    </div>
  );

  const ChartCard = ({ title, children, summary }) => (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-content">
        {children}
      </div>
      {summary && (
        <div className="chart-summary">
          {summary}
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Improved Header for All Devices */}
      <div className="dashboard-header">
        <div className="header-content">
          {/* Main Title Section */}
          <div className="header-main">
            <div className="header-title-wrapper">
              {isMobile && (
                <button className="mobile-menu-btn" onClick={onMenuToggle}>
                  <Menu size={24} />
                </button>
              )}
              <div className="title-section">
                <h1 className="page-title">Tamil Nadu Voter Pulse Dashboard</h1>
                <p className="page-subtitle">Real-time voter sentiment analysis and campaign intelligence</p>
              </div>
            </div>
            
            <div className="header-actions">
              <button className="refresh-button" onClick={refreshData} disabled={loading}>
                <RefreshCw size={20} className={loading ? 'spinning' : ''} />
                {!isMobile && <span>Refresh Data</span>}
              </button>
            </div>
          </div>
  
          {/* Stats Summary Bar */}
          <div className="header-stats-bar">
            <div className="stats-row">
              <div className="stat-group">
                <div className="stat-item-inline">
                  <span className="stat-label">Analysis Period:</span>
                  <span className="stat-value">May 27-28, 2025</span>
                </div>
                <div className="stat-item-inline">
                  <span className="stat-label">Total Content:</span>
                  <span className="stat-value">470 items</span>
                </div>
              </div>
              
              <div className="stat-group">
                <div className="stat-item-inline">
                  <span className="stat-label">Overall Sentiment:</span>
                  <span className="stat-value positive">POSITIVE (6.2/10)</span>
                </div>
                <div className="stat-item-inline">
                  <span className="stat-label">Confidence:</span>
                  <span className="stat-value info">MODERATE (67.8%)</span>
                </div>
              </div>
              
              <div className="stat-group">
                <div className="stat-item-inline">
                  <span className="stat-label">Last Updated:</span>
                  <span className="stat-value">{lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          title="Overall Sentiment" 
          value="58% Positive" 
          subtitle="↑ 5% from last 2 days" 
          icon={TrendingUp}
          trendDirection="up"
          isLoading={loading}
        />
        <StatCard 
          title="Total Content Analyzed" 
          value="470" 
          subtitle="items from last 2 days" 
          icon={MessageSquare}
          trendDirection="up"
          isLoading={loading}
        />
        <StatCard 
          title="Key Issues" 
          value="6 Active" 
          subtitle="Monitoring ongoing" 
          icon={AlertTriangle}
          isLoading={loading}
        />
        <StatCard 
          title="Neutralized Narratives" 
          value="18" 
          subtitle="↓ 3% from last 2 days" 
          icon={Target}
          trendDirection="down"
          isLoading={loading}
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Political Impact Distribution */}
        <ChartCard 
          title="Political Impact Distribution"
          summary={<><strong>Highest Impact:</strong> Legacy References (8.1)</>}
        >
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <BarChart data={dashboardData.politicalImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="category" 
                tick={{fontSize: isMobile ? 10 : 11}} 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                stroke="#64748b" 
              />
              <YAxis domain={[0, 10]} tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="score" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Data Sources Analysis */}
        <ChartCard 
          title="Data Sources Analysis"
          summary={<><strong>Best Platform:</strong> YouTube (25% positive)</>}
        >
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <BarChart data={dashboardData.dataSourcesAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="platform" 
                tick={{fontSize: isMobile ? 9 : 11}} 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                stroke="#64748b" 
              />
              <YAxis tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill={colors.primary} name="Positive" />
              <Bar dataKey="neutral" stackId="a" fill={colors.neutral} name="Neutral" />
              <Bar dataKey="negative" stackId="a" fill={colors.negative} name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Overall Sentiment Score */}
        <ChartCard title="Overall Sentiment Score: 6.2/10">
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <BarChart data={dashboardData.overallSentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <YAxis tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="sentiment-status">
            <p><strong>Status:</strong> MODERATE_POSITIVE with STABLE_UPWARD trend</p>
          </div>
        </ChartCard>

        {/* Hourly Timeline */}
        <ChartCard 
          title="Hourly Sentiment Timeline"
          summary={<><strong>Peak Hours:</strong> 12:00, 18:00 | <strong>Trend:</strong> Morning POSITIVE</>}
        >
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <LineChart data={dashboardData.hourlyTimelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{fontSize: isMobile ? 9 : 11}} stroke="#64748b" />
              <YAxis domain={[4, 7]} tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke={colors.primary} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Content Categories Performance */}
        <ChartCard 
          title="Content Categories Performance"
          summary={<><strong>Top Engagement:</strong> Historical References (8.1)</>}
        >
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <BarChart data={dashboardData.contentCategoriesData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="category" 
                tick={{fontSize: isMobile ? 8 : 10}} 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                stroke="#64748b" 
              />
              <YAxis yAxisId="left" tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill={colors.primary} name="Count" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="engagement" fill={colors.accent} name="Engagement" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Confidence Distribution */}
        <ChartCard title="Confidence Distribution">
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <PieChart>
              <Pie
                data={dashboardData.confidenceDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 80 : 100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
                labelStyle={{fontSize: isMobile ? 10 : 12}}
              >
                {dashboardData.confidenceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="confidence-summary">
            <p><strong>Overall Confidence Score:</strong> 67.8%</p>
          </div>
        </ChartCard>

        {/* Sentiment Breakdown */}
        <ChartCard title="Sentiment Breakdown">
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <PieChart>
              <Pie
                data={dashboardData.sentimentBreakdownData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 80 : 100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
                labelStyle={{fontSize: isMobile ? 10 : 12}}
              >
                {dashboardData.sentimentBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Platform Performance */}
        <ChartCard 
          title="Platform Performance"
          summary={<><strong>Leader:</strong> YouTube with 25% positive sentiment</>}
        >
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
            <BarChart data={dashboardData.platformPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="platform" 
                tick={{fontSize: isMobile ? 9 : 11}} 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                stroke="#64748b" 
              />
              <YAxis tick={{fontSize: isMobile ? 10 : 12}} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="percentage" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;