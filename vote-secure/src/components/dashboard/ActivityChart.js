import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = () => {
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month', 'year'
  
  // Mock data for different time ranges
  const chartData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [4, 7, 3, 5, 8, 2, 0]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [22, 18, 25, 16]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [65, 59, 80, 81, 56, 55, 40, 45, 70, 75, 60, 85]
    }
  };

  const data = {
    labels: chartData[timeRange].labels,
    datasets: [
      {
        label: 'Votes Cast',
        data: chartData[timeRange].values,
        fill: true,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `Votes: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Voting Activity</h3>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('week')} 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              timeRange === 'week'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')} 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              timeRange === 'month'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeRange('year')} 
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              timeRange === 'year'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="h-64 relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ActivityChart;