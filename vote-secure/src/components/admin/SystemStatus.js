import React from 'react';

// Mock system metrics data
const systemMetrics = {
  uptime: '99.98%',
  responseTime: '85ms',
  cpuUsage: '28%',
  memoryUsage: '42%',
  storage: '38%',
  userCount: '1,548',
  eventCount: '213',
  voteCount: '15,723',
  lastBackup: '2025-04-07T02:30:00Z',
  lastUpdate: '2025-04-05T14:15:00Z',
};

// Mock services status
const services = [
  { name: 'Authentication Service', status: 'operational', latency: '65ms' },
  { name: 'Database Service', status: 'operational', latency: '32ms' },
  { name: 'Vote Processing Service', status: 'operational', latency: '95ms' },
  { name: 'Email Service', status: 'degraded', latency: '285ms' },
  { name: 'Analytics Service', status: 'operational', latency: '120ms' },
  { name: 'Storage Service', status: 'operational', latency: '54ms' },
];

// Mock recent incidents
const incidents = [
  {
    id: 1,
    title: 'Email Service Degraded Performance',
    description: 'The email service is currently experiencing higher than normal latency. Our team is investigating.',
    status: 'investigating',
    date: '2025-04-07T09:15:00Z',
    severity: 'minor',
  },
  {
    id: 2,
    title: 'Database Maintenance',
    description: 'Scheduled database maintenance completed successfully. No user impact.',
    status: 'resolved',
    date: '2025-04-01T03:20:00Z',
    severity: 'maintenance',
  },
  {
    id: 3,
    title: 'API Rate Limiting Issue',
    description: 'Some API requests were being incorrectly rate limited. This has been fixed.',
    status: 'resolved',
    date: '2025-03-28T14:40:00Z',
    severity: 'minor',
  },
];

const SystemStatus = () => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'outage':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'major':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'minor':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            System Status
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overview of system health and performance metrics
          </p>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Uptime</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.uptime}</span>
                  <span className="ml-2 flex items-center text-sm font-medium text-green-600 dark:text-green-500">
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Response Time</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.responseTime}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU Usage</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.cpuUsage}</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500" style={{ width: systemMetrics.cpuUsage }}></div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Memory Usage</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.memoryUsage}</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500" style={{ width: systemMetrics.memoryUsage }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage Usage</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.storage}</span>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500" style={{ width: systemMetrics.storage }}></div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.userCount}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.eventCount}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Votes</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMetrics.voteCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last System Update</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {formatDate(systemMetrics.lastUpdate)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Backup</h4>
              <div className="mt-1 flex items-baseline">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {formatDate(systemMetrics.lastBackup)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Services Status
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Current status of all system services
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Latency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {services.map((service, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${parseInt(service.latency) > 200 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {service.latency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Recent Incidents
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            System incidents and their current status
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {incidents.map((incident) => (
            <li key={incident.id} className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{incident.title}</h4>
                    <div className="mt-1 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getStatusBadgeClass(incident.status)}`}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeClass(incident.severity)}`}>
                        {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(incident.date)}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {incident.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SystemStatus;