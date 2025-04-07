import React, { useState } from 'react';

// Sample voting events data
const mockEvents = [
  {
    id: 1,
    title: 'Board Member Election',
    description: 'Annual election for the board of directors',
    status: 'active',
    endDate: '2025-04-15T23:59:59', // Future date
    participants: 45,
    totalEligible: 50,
    hasVoted: false
  },
  {
    id: 2,
    title: 'Budget Approval',
    description: 'Vote on the proposed budget for the next fiscal year',
    status: 'active',
    endDate: '2025-04-10T23:59:59', // Future date
    participants: 38,
    totalEligible: 50,
    hasVoted: true
  },
  {
    id: 3,
    title: 'Office Location',
    description: 'Choose between three potential new office locations',
    status: 'upcoming',
    endDate: '2025-05-20T23:59:59', // Future date
    participants: 0,
    totalEligible: 50,
    hasVoted: false
  },
  {
    id: 4,
    title: 'Company Logo Redesign',
    description: 'Select from the final design options for our new company logo',
    status: 'completed',
    endDate: '2025-03-25T23:59:59', // Past date
    participants: 47,
    totalEligible: 50,
    hasVoted: true
  },
  {
    id: 5,
    title: 'Remote Work Policy',
    description: 'Vote on changes to the company remote work policy',
    status: 'completed',
    endDate: '2025-03-15T23:59:59', // Past date
    participants: 49,
    totalEligible: 50,
    hasVoted: true
  }
];

const VotingEvents = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'upcoming', 'completed'

  const filteredEvents = filter === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.status === filter);

  // Get the current date for comparing with event dates
  const now = new Date();
  
  // Calculate time remaining until endDate
  const getTimeRemaining = (endDate) => {
    const total = new Date(endDate) - now;
    
    if (total <= 0) return 'Ended';
    
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} left`;
    
    return 'Ending soon';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mr-auto">Voting Events</h3>
          
          {/* Filter tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'active'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'upcoming'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === 'completed'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredEvents.length === 0 ? (
            <li className="p-6 text-center text-gray-500 dark:text-gray-400">
              No {filter !== 'all' ? filter : ''} voting events found.
            </li>
          ) : (
            filteredEvents.map(event => (
              <li key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start">
                  {/* Status indicator */}
                  <div className="mr-4 mt-1">
                    {event.status === 'active' && (
                      <span className="flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        </span>
                      </span>
                    )}
                    {event.status === 'upcoming' && (
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    )}
                    {event.status === 'completed' && (
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400 dark:bg-gray-500"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h4>
                      
                      {/* Vote button or status indicator */}
                      {event.status === 'active' && !event.hasVoted ? (
                        <button className="ml-2 inline-flex items-center px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                          Vote Now
                        </button>
                      ) : event.status === 'active' && event.hasVoted ? (
                        <span className="ml-2 inline-flex items-center px-3 py-1 text-sm rounded-md bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Voted
                        </span>
                      ) : null}
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center mr-4">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{getTimeRemaining(event.endDate)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>{event.participants} / {event.totalEligible} participants</span>
                        
                        {/* Progress bar for participation */}
                        <div className="ml-2 w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full dark:bg-indigo-500" 
                            style={{ width: `${(event.participants / event.totalEligible) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      
      {/* View all link */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="p-4 text-center">
          <button className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            View all voting events
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingEvents;