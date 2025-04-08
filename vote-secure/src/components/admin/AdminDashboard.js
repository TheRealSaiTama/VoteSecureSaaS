import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RevenueChart from './RevenueChart';
import SystemStatus from './SystemStatus';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'users', 'polls', 'settings'

  // Quick stats for overview
  const stats = [
    { id: 'total_users', name: 'Total Users', value: '852', change: '+4.75%', trend: 'up' },
    { id: 'active_polls', name: 'Active Polls', value: '24', change: '+12.5%', trend: 'up' },
    { id: 'completed_polls', name: 'Completed Polls', value: '146', change: '+5.12%', trend: 'up' },
    { id: 'monthly_revenue', name: 'Monthly Revenue', value: '$24,500', change: '+8.32%', trend: 'up' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Dashboard header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {currentUser?.name || 'Admin'}
          </p>
        </div>
        
        {/* Navigation tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('polls')}
              className={`${
                activeTab === 'polls'
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Polls Management
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              Settings
            </button>
          </nav>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="ml-0 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            {stat.name}
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                              {stat.value}
                            </div>
                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.trend === 'up' 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {stat.trend === 'up' ? (
                                <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 14.586V7a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                              <span className="sr-only">
                                {stat.trend === 'up' ? 'Increased by' : 'Decreased by'}
                              </span>
                              {stat.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Revenue Chart and System Status */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-6">
              <RevenueChart />
              <SystemStatus />
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activities
                </h3>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          JD
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          Jane Doe created a new poll
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          "Annual Budget Allocation" - 32 minutes ago
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-medium">
                          JS
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          John Smith suspended a user
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          User "tom.cook@example.com" - 1 hour ago
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                          AR
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          Alice Roberts closed a poll
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          "Office Location Vote" - 3 hours ago
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                    View all activities
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Users Tab */}
        {activeTab === 'users' && (
          <UserManagement />
        )}
        
        {/* Polls Management Tab */}
        {activeTab === 'polls' && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Polls Management
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                This section would contain tools to create, edit, and manage voting polls.
              </p>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Settings
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                This section would contain global application settings, security configurations, and preferences.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;