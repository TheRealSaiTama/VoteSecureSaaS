import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth', { state: { mode: 'signup' } });
  };

  return (
    <div className="landing-page pt-16 bg-white dark:bg-gray-900">
      <Hero onGetStarted={handleGetStarted} />
      
      {/* Trusted by section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wide">
              Trusted by leading organizations worldwide
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {/* Example company logos - replace with actual company SVGs in a real app */}
            <div className="h-8 text-gray-400 dark:text-gray-500">
              <svg className="h-8" viewBox="0 0 100 30" fill="currentColor">
                <path d="M20 10h10v10H20z" />
                <path d="M40 10h10v10H40z" />
                <path d="M60 10h20v5H60z" />
                <path d="M60 20h20v5H60z" />
              </svg>
            </div>
            <div className="h-8 text-gray-400 dark:text-gray-500">
              <svg className="h-8" viewBox="0 0 100 30" fill="currentColor">
                <circle cx="20" cy="15" r="10" />
                <path d="M40 5h20v20H40z" />
              </svg>
            </div>
            <div className="h-8 text-gray-400 dark:text-gray-500">
              <svg className="h-8" viewBox="0 0 100 30" fill="currentColor">
                <path d="M10 10 L30 10 L20 25 Z" />
                <path d="M40 10h30v5H40z" />
                <path d="M40 20h20v5H40z" />
              </svg>
            </div>
            <div className="h-8 text-gray-400 dark:text-gray-500">
              <svg className="h-8" viewBox="0 0 100 30" fill="currentColor">
                <rect x="10" y="10" width="20" height="20" rx="10" />
                <path d="M40 10h30v20H40z" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      <Pricing />
      
      {/* CTA Section */}
      <section className="bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your voting process?</span>
            <span className="block text-indigo-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <FAQ />
    </div>
  );
};

export default LandingPage;