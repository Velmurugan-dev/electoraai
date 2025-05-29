import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, MessageSquare, Target, AlertTriangle } from 'lucide-react';
import { dashboardData } from '../data/dashboardData';

const Dashboard = () => {
  const colors = {
    primary: '#4ade80',
    negative: '#ef4444',
    neutral: '#60a5fa',
    accent: '#7c3aed',
    secondary: '#ea580c',
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trendDirection }) => (
    <div className="stat-card">
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
          <Icon size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="page-title">Tamil Nadu Voter Pulse Dashboard</h1>
          <p className="page-subtitle">Real-time voter sentiment analysis and campaign intelligence</p>
          <div className="header-stats">
            <span>Analysis Period: May 27-28, 2025</span>
            <span>Total Content: 470 items</span>
            <span>Overall Sentiment: <strong className="positive">POSITIVE (6.2/10)</strong></span>
            <span>Confidence Level: <strong className="info">MODERATE (67.8%)</strong></span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard 
          title="Overall Sentiment" 
          value="58% Positive" 
          subtitle="5% from last 2 days" 
          icon={TrendingUp}
          trendDirection="up"
        />
        <StatCard 
          title="Total Content Analyzed" 
          value="470" 
          subtitle="items from last 2 days" 
          icon={MessageSquare}
          trendDirection="up"
        />
        <StatCard 
          title="Key Issues" 
          value="6 Active" 
          subtitle="Monitoring ongoing" 
          icon={AlertTriangle}
        />
        <StatCard 
          title="Neutralized Narratives" 
          value="18" 
          subtitle="3% from last 2 days" 
          icon={Target}
          trendDirection="down"
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Political Impact Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Political Impact Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.politicalImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{fontSize: 11}} angle={-45} textAnchor="end" height={70} stroke="#64748b" />
              <YAxis domain={[0, 10]} tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="score" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-summary">
            <strong>Highest Impact:</strong> Legacy References (8.1)
          </div>
        </div>

        {/* Data Sources Analysis */}
        <div className="chart-card">
          <h3 className="chart-title">Data Sources Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.dataSourcesAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="platform" tick={{fontSize: 11}} angle={-45} textAnchor="end" height={70} stroke="#64748b" />
              <YAxis tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill={colors.primary} name="Positive" />
              <Bar dataKey="neutral" stackId="a" fill={colors.neutral} name="Neutral" />
              <Bar dataKey="negative" stackId="a" fill={colors.negative} name="Negative" />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-summary">
            <strong>Best Platform:</strong> YouTube (25% positive)
          </div>
        </div>

        {/* Overall Sentiment Score */}
        <div className="chart-card">
          <h3 className="chart-title">Overall Sentiment Score: 6.2/10</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.overallSentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{fontSize: 12}} stroke="#64748b" />
              <YAxis tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="sentiment-status">
            <p><strong>Status:</strong> MODERATE_POSITIVE with STABLE_UPWARD trend</p>
          </div>
        </div>

        {/* Hourly Timeline */}
        <div className="chart-card">
          <h3 className="chart-title">Hourly Sentiment Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.hourlyTimelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{fontSize: 11}} stroke="#64748b" />
              <YAxis domain={[4, 7]} tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke={colors.primary} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-summary">
            <strong>Peak Hours:</strong> 12:00, 18:00 | <strong>Trend:</strong> Morning POSITIVE
          </div>
        </div>

        {/* Content Categories Performance */}
        <div className="chart-card">
          <h3 className="chart-title">Content Categories Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.contentCategoriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{fontSize: 10}} angle={-45} textAnchor="end" height={70} stroke="#64748b" />
              <YAxis yAxisId="left" tick={{fontSize: 12}} stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill={colors.primary} name="Count" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="engagement" fill={colors.accent} name="Engagement" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-summary">
            <strong>Top Engagement:</strong> Historical References (8.1)
          </div>
        </div>

        {/* Confidence Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Confidence Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.confidenceDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
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
        </div>

        {/* Sentiment Breakdown */}
        <div className="chart-card">
          <h3 className="chart-title">Sentiment Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.sentimentBreakdownData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}%`}
              >
                {dashboardData.sentimentBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Performance */}
        <div className="chart-card">
          <h3 className="chart-title">Platform Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.platformPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="platform" tick={{fontSize: 11}} angle={-45} textAnchor="end" height={70} stroke="#64748b" />
              <YAxis tick={{fontSize: 12}} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="percentage" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="chart-summary">
            <strong>Leader:</strong> YouTube with 25% positive sentiment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;