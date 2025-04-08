import React, { useState } from 'react';

// Mock revenue data - in a real application this would come from an API
const mockMonthlyData = [
  { month: 'Jan', revenue: 18000, customers: 120, polls: 35 },
  { month: 'Feb', revenue: 22000, customers: 132, polls: 42 },
  { month: 'Mar', revenue: 19500, customers: 141, polls: 38 },
  { month: 'Apr', revenue: 24500, customers: 145, polls: 53 },
  { month: 'May', revenue: 28000, customers: 162, polls: 61 },
  { month: 'Jun', revenue: 25000, customers: 168, polls: 57 },
  { month: 'Jul', revenue: 29500, customers: 176, polls: 64 },
  { month: 'Aug', revenue: 32000, customers: 184, polls: 72 },
  { month: 'Sep', revenue: 30500, customers: 191, polls: 69 },
  { month: 'Oct', revenue: 34000, customers: 210, polls: 78 },
  { month: 'Nov', revenue: 37500, customers: 231, polls: 88 },
  { month: 'Dec', revenue: 42000, customers: 245, polls: 96 },
];

const mockQuarterlyData = [
  { quarter: 'Q1', revenue: 59500, customers: 141, polls: 115 },
  { quarter: 'Q2', revenue: 77500, customers: 168, polls: 171 },
  { quarter: 'Q3', revenue: 92000, customers: 191, polls: 205 },
  { quarter: 'Q4', revenue: 113500, customers: 245, polls: 262 },
];

const mockYearlyData = [
  { year: '2023', revenue: 242000, customers: 140, polls: 510 },
  { year: '2024', revenue: 298000, customers: 195, polls: 620 },
  { year: '2025 (YTD)', revenue: 137000, customers: 245, polls: 290 },
];

const RevenueChart = () => {
  const [timeframe, setTimeframe] = useState('monthly'); // 'monthly', 'quarterly', 'yearly'
  const [chartData, setChartData] = useState(mockMonthlyData);
  
  // Get data based on selected timeframe
  const getDataForTimeframe = (selectedTimeframe) => {
    switch (selectedTimeframe) {
      case 'monthly':
        return mockMonthlyData;
      case 'quarterly':
        return mockQuarterlyData;
      case 'yearly':
        return mockYearlyData;
      default:
        return mockMonthlyData;
    }
  };
  
  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    setChartData(getDataForTimeframe(newTimeframe));
  };
  
  // Calculate the maximum revenue for setting the chart height
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Get the period label based on timeframe
  const getPeriodLabel = () => {
    switch (timeframe) {
      case 'monthly':
        return 'Month';
      case 'quarterly':
        return 'Quarter';
      case 'yearly':
        return 'Year';
      default:
        return 'Period';
    }
  };
  
  // Calculate comparison with previous period
  const currentTotal = chartData.reduce((sum, item) => sum + item.revenue, 0);
  // Mock previous period data (in a real app, this would come from the backend)
  const previousPeriodTotal = currentTotal * 0.85; // Assuming 15% growth
  const changePercentage = ((currentTotal - previousPeriodTotal) / previousPeriodTotal) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Revenue Analytics
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Financial performance overview
          </p>
        </div>
        
        {/* Timeframe selector */}
        <div className="mt-3 sm:mt-0 flex rounded-md shadow-sm">
          <button
            type="button"
            className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
              timeframe === 'monthly'
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            } focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
            onClick={() => handleTimeframeChange('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`relative inline-flex items-center px-4 py-2 border-t border-b border-gray-300 dark:border-gray-600 text-sm font-medium ${
              timeframe === 'quarterly'
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            } focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 -ml-px`}
            onClick={() => handleTimeframeChange('quarterly')}
          >
            Quarterly
          </button>
          <button
            type="button"
            className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
              timeframe === 'yearly'
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            } focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 -ml-px`}
            onClick={() => handleTimeframeChange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      
      {/* Revenue summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-5 sm:p-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Revenue
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {formatCurrency(currentTotal)}
          </div>
          <div className={`mt-1 flex items-center text-sm ${
            changePercentage >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {changePercentage >= 0 ? (
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586V7a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span>{changePercentage.toFixed(2)}% from previous period</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Average Revenue per Poll
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {(() => {
              const totalPolls = chartData.reduce((sum, item) => sum + item.polls, 0);
              return totalPolls > 0 ? formatCurrency(currentTotal / totalPolls) : 'N/A';
            })()}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Customers
          </div>
          <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {chartData[chartData.length - 1]?.customers || 0}
          </div>
        </div>
      </div>
      
      {/* Revenue chart */}
      <div className="px-4 py-5 sm:p-6">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
          Revenue Trend
        </h4>
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
            <div>${(maxRevenue * 0.8).toLocaleString()}</div>
            <div>${(maxRevenue * 0.6).toLocaleString()}</div>
            <div>${(maxRevenue * 0.4).toLocaleString()}</div>
            <div>${(maxRevenue * 0.2).toLocaleString()}</div>
            <div>$0</div>
          </div>
          
          {/* Chart grid */}
          <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between">
            <div className="border-b border-gray-300 dark:border-gray-700 h-1/5 relative">
              <div className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700 inset-0"></div>
            </div>
            <div className="border-b border-gray-300 dark:border-gray-700 h-1/5 relative">
              <div className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700 inset-0"></div>
            </div>
            <div className="border-b border-gray-300 dark:border-gray-700 h-1/5 relative">
              <div className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700 inset-0"></div>
            </div>
            <div className="border-b border-gray-300 dark:border-gray-700 h-1/5 relative">
              <div className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700 inset-0"></div>
            </div>
            <div className="border-b border-gray-300 dark:border-gray-700 h-1/5 relative">
              <div className="absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700 inset-0"></div>
            </div>
          </div>
          
          {/* Bar chart */}
          <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end">
            <div className="flex-1 flex justify-around items-end h-full">
              {chartData.map((item, i) => {
                const height = `${(item.revenue / maxRevenue) * 100}%`;
                const periodKey = timeframe === 'monthly' 
                  ? item.month 
                  : timeframe === 'quarterly' 
                    ? item.quarter 
                    : item.year;
                
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="bg-gradient-to-t from-indigo-600 to-indigo-400 dark:from-indigo-700 dark:to-indigo-500 rounded-t w-8 sm:w-12 relative group cursor-pointer"
                      style={{ height }}
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-50 px-3 pointer-events-none transform -translate-x-1/2 mb-1">
                        {formatCurrency(item.revenue)}
                        <svg className="absolute text-black h-2 w-full left-0 bottom-0" viewBox="0 0 255 255">
                          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {periodKey}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* X-axis label */}
        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {getPeriodLabel()}
        </div>
      </div>
      
      {/* Export buttons */}
      <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-between">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export CSV
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
          </svg>
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default RevenueChart;