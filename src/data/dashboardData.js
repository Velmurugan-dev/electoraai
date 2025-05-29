export const dashboardData = {
    overallSentimentData: [
      { category: 'Posts', value: 4.8 },
      { category: 'Comments', value: 1.4 },
      { category: 'Momentum', value: 0.3 }
    ],
  
    politicalImpactData: [
      { category: 'Alliance', score: 7.2 },
      { category: 'Leadership', score: 6.8 },
      { category: 'Legacy', score: 8.1 },
      { category: 'Policy', score: 6.5 },
      { category: 'Opposition', score: 5.8 },
      { category: 'Grassroots', score: 6.2 }
    ],
  
    dataSourcesAnalysis: [
      { platform: 'Facebook', positive: 5, negative: 3, neutral: 53 },
      { platform: 'YouTube', positive: 10, negative: 1, neutral: 29 },
      { platform: 'Twitter', positive: 0, negative: 0, neutral: 41 },
      { platform: 'Instagram', positive: 3, negative: 0, neutral: 55 },
      { platform: 'RSS News', positive: 0, negative: 0, neutral: 6 },
      { platform: 'Tamil News', positive: 0, negative: 0, neutral: 23 }
    ],
  
    hourlyTimelineData: [
      { time: '00:00', score: 5.0 },
      { time: '01:00', score: 5.6 },
      { time: '02:00', score: 4.7 },
      { time: '06:00', score: 6.2 },
      { time: '09:00', score: 5.8 },
      { time: '12:00', score: 6.5 },
      { time: '15:00', score: 5.0 },
      { time: '18:00', score: 6.1 },
      { time: '21:00', score: 5.9 },
      { time: '24:00', score: 5.4 }
    ],
  
    contentCategoriesData: [
      { category: 'Political News', count: 145, engagement: 4.2 },
      { category: 'Alliance Updates', count: 78, engagement: 6.8 },
      { category: 'Leadership', count: 62, engagement: 5.1 },
      { category: 'Policy', count: 38, engagement: 3.9 },
      { category: 'Campaign', count: 47, engagement: 7.2 },
      { category: 'Historical', count: 35, engagement: 8.1 }
    ],
  
    confidenceDistributionData: [
      { name: 'High', value: 30.2, color: '#4ade80' },
      { name: 'Medium', value: 48.5, color: '#60a5fa' },
      { name: 'Low', value: 21.3, color: '#ef4444' }
    ],
  
    sentimentBreakdownData: [
      { name: 'Positive', value: 8, color: '#4ade80' },
      { name: 'Negative', value: 2, color: '#ef4444' },
      { name: 'Neutral', value: 90, color: '#60a5fa' }
    ],
  
    platformPerformanceData: [
      { platform: 'YouTube', percentage: 25 },
      { platform: 'Facebook', percentage: 8 },
      { platform: 'Instagram', percentage: 5 },
      { platform: 'Twitter', percentage: 0 },
      { platform: 'RSS News', percentage: 0 },
      { platform: 'Tamil News', percentage: 0 }
    ]
  };
  
  // Real-time data simulation
  export const generateLiveData = () => {
    const variance = () => (Math.random() - 0.5) * 0.2;
    
    return {
      ...dashboardData,
      overallSentimentData: dashboardData.overallSentimentData.map(item => ({
        ...item,
        value: Math.max(0, item.value + variance())
      })),
      politicalImpactData: dashboardData.politicalImpactData.map(item => ({
        ...item,
        score: Math.max(0, Math.min(10, item.score + variance()))
      }))
    };
  };