import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '/auth?plan=basic',
    priceMonthly: '$15',
    priceAnnual: '$12',
    description: 'Everything necessary for small teams or organizations just getting started.',
    features: [
      'Up to 50 participants',
      '5 active polls at once',
      'Basic analytics',
      'Email support',
      'Vote verification'
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/auth?plan=pro',
    priceMonthly: '$30',
    priceAnnual: '$24',
    description: 'Perfect for growing organizations with more complex voting needs.',
    features: [
      'Up to 500 participants',
      'Unlimited active polls',
      'Advanced analytics & reports',
      'Priority email support',
      'Vote verification',
      'Custom branding',
      'API access'
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/auth?plan=enterprise',
    priceMonthly: 'Custom',
    priceAnnual: 'Custom',
    description: 'Dedicated support and enterprise features for large organizations.',
    features: [
      'Unlimited participants',
      'Unlimited active polls',
      'Advanced analytics & reports',
      'Dedicated account manager',
      'SSO integration',
      'Custom branding',
      'API access',
      'On-premise deployment option',
      'SLA guarantee'
    ],
    mostPopular: false,
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <div id="pricing" className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-center">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-5 text-xl text-gray-500 dark:text-gray-400 sm:text-center">
            Start with a 14-day free trial. No credit card required.
          </p>
          
          {/* Toggle between monthly and annual billing */}
          <div className="relative mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5 flex sm:mt-8 sm:w-72 sm:mx-auto">
            <button
              type="button"
              className={`${
                !annual ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              } relative w-1/2 py-2 text-sm font-medium rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-colors duration-200`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`${
                annual ? 'bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              } relative w-1/2 py-2 text-sm font-medium rounded-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 transition-colors duration-200`}
              onClick={() => setAnnual(true)}
            >
              Annual <span className="text-indigo-400 font-normal">(Save 20%)</span>
            </button>
          </div>
        </div>
        
        {/* Pricing tiers */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700 ${
                tier.mostPopular 
                  ? 'border-2 border-indigo-500 dark:border-indigo-400' 
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{tier.name}</h2>
                {tier.mostPopular && (
                  <p className="absolute top-0 transform -translate-y-1/2 bg-indigo-500 rounded-full px-3 py-0.5 text-sm font-semibold text-white">
                    Most Popular
                  </p>
                )}
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{annual ? tier.priceAnnual : tier.priceMonthly}</span>
                  {tier.priceMonthly !== 'Custom' && (
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">/mo</span>
                  )}
                </p>
                <Link
                  to={tier.href}
                  className={`mt-8 block w-full bg-indigo-600 dark:bg-indigo-500 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700 dark:hover:bg-indigo-600 transition ${
                    tier.mostPopular ? 'shadow-md' : ''
                  }`}
                >
                  {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start your trial'}
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 dark:text-white uppercase tracking-wide">What's included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg 
                        className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;