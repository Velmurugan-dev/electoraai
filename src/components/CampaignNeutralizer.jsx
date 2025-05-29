import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu, Filter, ChevronDown } from 'lucide-react';
import { narrativesData, strategiesData } from '../data/neutralizerData';

const CampaignNeutralizer = ({ isMobile, onMenuToggle }) => {
  const [selectedNarrative, setSelectedNarrative] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredNarratives, setFilteredNarratives] = useState(narrativesData);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileStrategy, setShowMobileStrategy] = useState(false);

  useEffect(() => {
    let filtered = narrativesData;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(narrative => {
        if (activeFilter === 'policy') {
          return narrative.category === 'policy' || narrative.category === 'criticism';
        }
        if (activeFilter === 'character') {
          return narrative.category === 'character';
        }
        if (activeFilter === 'coalition') {
          return narrative.category === 'coalition' || narrative.category === 'platform' || narrative.category === 'engagement';
        }
        return narrative.category === activeFilter;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(narrative =>
        narrative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        narrative.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        narrative.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNarratives(filtered);
  }, [searchTerm, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (isMobile) {
      setShowMobileFilters(false);
    }
  };

  const handleNarrativeSelect = (narrative) => {
    setSelectedNarrative(narrative);
    if (isMobile) {
      setShowMobileStrategy(true);
    }
  };

  const handleAction = (action, narrativeId) => {
    const actions = {
      deploy: {
        twitter_void: "🚨 URGENT: Twitter activation campaign deploying immediately. Leveraging YouTube's 25% positive success model. Expected to convert 0% to 10%+ positive within 48 hours.",
        opposition_viral: "⚡ Counter-viral content deploying across YouTube (25% positive) and regional Tamil media. Targeting 9.2+ engagement rate to match opposition criticism.",
        neutral_apathy: "🎯 Massive engagement campaign targeting 90% neutral voters. YouTube-first strategy with MGR legacy content to convert neutral to positive.",
        leadership_attacks: "🛡️ Leadership defense strategy deploying across YouTube and mainstream media. Amplifying EPS positive narrative with MGR legacy connection.",
        policy_criticism: "📢 Policy communication enhancement deploying during peak hours. Using alliance success lens to boost engagement and virality.",
        alliance_doubts: "🤝 Alliance success showcase deploying across YouTube and Facebook. Highlighting concrete benefits and achievements.",
        dmk_counter_narrative: "⚔️ DMK counter-narrative strategy deploying across regional Tamil media. Using development achievements and MGR legacy framing.",
        youth_disconnect: "👥 Youth re-engagement strategy deploying on Instagram and YouTube. Using modern platform optimization and employment opportunities."
      },
      approve: {
        twitter_void: "✅ Twitter emergency activation approved. Budget allocated for immediate content creation and influencer partnerships.",
        opposition_viral: "✅ Counter-viral strategy approved. Creative team activated to match opposition's 9.2 engagement rate with positive content.",
        neutral_apathy: "✅ Voter activation campaign approved. All platforms activated to convert 90% neutral sentiment to positive engagement.",
        leadership_attacks: "✅ Leadership defense strategy approved. Positive narrative campaign with MGR legacy association activated.",
        policy_criticism: "✅ Policy enhancement strategy approved. Alliance success messaging framework implemented across platforms.",
        alliance_doubts: "✅ Alliance showcase strategy approved. Success stories and benefits communication campaign initiated.",
        dmk_counter_narrative: "✅ DMK counter-strategy approved. Development achievements and legacy framing campaign deployed.",
        youth_disconnect: "✅ Youth re-engagement strategy approved. Modern platform optimization and employment messaging activated."
      },
      customize: {
        twitter_void: "🎨 Customize Twitter strategy: Adjust hashtag campaigns, influencer partnerships, or content format (threads vs tweets vs spaces).",
        opposition_viral: "🎨 Customize viral counter-strategy: Modify content themes, adjust platform mix, or change timing for maximum impact.",
        neutral_apathy: "🎨 Customize engagement campaign: Modify activation triggers, content emotional appeal, or platform prioritization.",
        leadership_attacks: "🎨 Customize leadership defense: Adjust narrative strength, modify MGR legacy emphasis, or change platform targeting.",
        policy_criticism: "🎨 Customize policy strategy: Modify alliance framing, adjust engagement timing, or change content format.",
        alliance_doubts: "🎨 Customize alliance showcase: Adjust success story emphasis, modify timing, or change platform focus.",
        dmk_counter_narrative: "🎨 Customize counter-strategy: Modify development emphasis, adjust legacy framing, or change media targeting.",
        youth_disconnect: "🎨 Customize youth strategy: Adjust platform optimization, modify employment messaging, or change content format."
      }
    };

    const message = actions[action]?.[narrativeId];
    if (message) {
      const title = action === 'deploy' ? 'Strategy Deployed Successfully! 🚀' : 
                   action === 'approve' ? 'Strategy Approved & Scheduled! ✅' : 
                   'Opening Strategy Editor... 🎨';
      
      const footer = action === 'deploy' ? 'Data-driven deployment based on actual AIADMK sentiment analysis.' :
                    action === 'approve' ? 'Implementation begins within 2 hours with measurable KPIs.' :
                    'Customize based on real-time sentiment shifts and platform performance.';
      
      alert(`${title}\n\n${message}\n\n${footer}`);
    }
  };

  const getCategoryClass = (category) => {
    const categoryClasses = {
      policy: 'tag-policy',
      character: 'tag-character',
      coalition: 'tag-coalition',
      platform: 'tag-platform',
      criticism: 'tag-criticism',
      engagement: 'tag-engagement'
    };
    return categoryClasses[category] || 'tag-default';
  };

  const getSentimentClass = (sentiment) => {
    return sentiment.replace(' ', '-').toLowerCase();
  };

  return (
    <div className="neutralizer-container">
      {/* Unified Header for All Devices */}
      <div className="neutralizer-header">
        <div className="header-content-wrapper">
          {/* Top Header Bar */}
          <div className="header-top">
            <div className="header-left">
              {isMobile && (
                <button className="mobile-menu-btn" onClick={onMenuToggle}>
                  <Menu size={24} />
                </button>
              )}
              <div className="brand-section">
                <h1 className="header-brand-title">ELECTORA</h1>
                <span className="region-badge">TAMIL NADU</span>
              </div>
              <div className="date-info">
                <span>📅</span>
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
            </div>
            
            <div className="header-right">
              {isMobile && (
                <button 
                  className="filter-toggle-btn"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                  <Filter size={20} />
                </button>
              )}
              <button className="notification-btn">
                <Bell size={20} />
              </button>
              <div className="user-avatar">
                <User size={20} />
              </div>
            </div>
          </div>
  
          {/* Page Title Section */}
          <div className="page-header-section">
            <h2 className="page-main-title">Negative Campaign Neutralizer</h2>
            <p className="page-description">AI-powered content strategy to counter opposition narratives with data-driven messaging for AIADMK growth</p>
          </div>
        </div>
      </div>
  
      {/* Mobile Filters Dropdown */}
      {isMobile && showMobileFilters && (
        <div className="mobile-filters-overlay">
          <div className="mobile-filters-content">
            {['all', 'policy', 'character', 'coalition'].map(filter => (
              <button
                key={filter}
                className={`mobile-filter-option ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter === 'all' ? 'All Categories' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}  

      {/* Main Content */}
      <div className={`content-grid ${isMobile ? 'mobile' : 'desktop'}`}>
        {/* Opposition Narratives Panel */}
        <div className={`opposition-panel ${isMobile && showMobileStrategy ? 'hidden-mobile' : ''}`}>
          <div className="panel-header">
            <h2 className="panel-title">Opposition Narratives</h2>
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Search narratives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Filter Tabs */}
          {!isMobile && (
            <div className="filter-tabs">
              {['all', 'policy', 'character', 'coalition'].map(filter => (
                <button
                  key={filter}
                  className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter === 'all' ? 'All Categories' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          )}

          <div className="narratives-container">
            {filteredNarratives.map(narrative => (
              <div
                key={narrative.id}
                className={`narrative-card ${selectedNarrative?.id === narrative.id ? 'selected' : ''}`}
                onClick={() => handleNarrativeSelect(narrative)}
              >
                <div className="narrative-title">
                  <span className="title-text">{narrative.title}</span>
                  <span className={`category-tag ${getCategoryClass(narrative.category)}`}>
                    {narrative.category}
                  </span>
                </div>
                <div className="narrative-source">{narrative.source}</div>
                <div className="narrative-meta">
                  <span className="sentiment-info">
                    Sentiment: <span className={`sentiment-value sentiment-${getSentimentClass(narrative.sentiment)}`}>
                      {narrative.sentiment}
                    </span>
                  </span>
                  <span className="impressions-info">
                    👁️ {narrative.impressions}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counter-Narrative Generator Panel */}
        <div className={`counter-panel ${isMobile && !showMobileStrategy ? 'hidden-mobile' : ''}`}>
          {isMobile && showMobileStrategy && (
            <div className="mobile-strategy-header">
              <button 
                className="back-button"
                onClick={() => setShowMobileStrategy(false)}
              >
                ← Back to Narratives
              </button>
            </div>
          )}
          
          <div className="counter-header">
            <h2 className="counter-title">Counter-Narrative Generator</h2>
          </div>
          
          <div className="counter-content">
            {selectedNarrative ? (
              <div className="strategy-content">
                <div className="strategy-header">
                  <h3 className="strategy-title">{strategiesData[selectedNarrative.id]?.title}</h3>
                  <p className="strategy-subtitle">{strategiesData[selectedNarrative.id]?.subtitle}</p>
                  <div className="confidence-badge">
                    <strong>Data Confidence:</strong> {strategiesData[selectedNarrative.id]?.confidence}
                  </div>
                </div>
                <div className="strategy-body">
                  <ul className="strategy-list">
                    {strategiesData[selectedNarrative.id]?.points.map((point, index) => (
                      <li key={index} className="strategy-item">
                        <span className="strategy-icon">✓</span>
                        <span className="strategy-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="data-support-box">
                    <div className="data-support-title">📊 Data Support:</div>
                    <div className="data-support-text">{strategiesData[selectedNarrative.id]?.data_support}</div>
                  </div>
                </div>
                <div className="action-bar">
                  <button 
                    className="action-btn btn-deploy" 
                    onClick={() => handleAction('deploy', selectedNarrative.id)}
                  >
                    Deploy Strategy
                  </button>
                  <button 
                    className="action-btn btn-approve" 
                    onClick={() => handleAction('approve', selectedNarrative.id)}
                  >
                    Approve & Schedule
                  </button>
                  <button 
                    className="action-btn btn-customize" 
                    onClick={() => handleAction('customize', selectedNarrative.id)}
                  >
                    Customize
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🛡️</span>
                <p className="empty-text">Select an opposition narrative from the left to generate a data-driven counter-strategy</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignNeutralizer;