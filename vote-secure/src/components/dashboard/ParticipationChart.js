import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ParticipationChart = () => {
  // Mock data for the participation chart
  const participationData = {
    labels: ['Participated', 'Pending', 'Missed'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)', // Indigo for participated
          'rgba(251, 191, 36, 0.8)', // Amber for pending
          'rgba(239, 68, 68, 0.8)'   // Red for missed
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value * 100) / total);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Voting Participation</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last 30 days
        </div>
      </div>

      <div className="h-64 relative flex items-center justify-center">
        <Doughnut data={participationData} options={options} />
        
        {/* Center stats */}
        <div className="absolute flex flex-col justify-center items-center text-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">75%</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Participation Rate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">15</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Votes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold text-green-500 dark:text-green-400">3</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Active Polls</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold text-amber-500 dark:text-amber-400">2</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default ParticipationChart;