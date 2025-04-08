import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: 'How secure is VoteSecure?',
    answer: 'VoteSecure uses end-to-end encryption to ensure that all votes remain confidential and tamper-proof. Our system is regularly audited by independent security firms and complies with industry-standard security protocols. We also provide comprehensive audit trails for complete transparency.'
  },
  {
    id: 2,
    question: 'Can I customize the voting process for my organization?',
    answer: 'Yes, VoteSecure offers extensive customization options. You can create polls with different voting methods (single choice, multiple choice, ranked-choice, weighted), set eligibility criteria, customize the voting duration, add your organization\'s branding, and much more.'
  },
  {
    id: 3,
    question: 'How does the pricing work?',
    answer: 'VoteSecure offers transparent pricing tiers based on your organization\'s needs. Our Basic plan starts at $12/month when billed annually and includes up to 50 participants. You can upgrade or downgrade your plan anytime. All plans start with a 14-day free trial, no credit card required.'
  },
  {
    id: 4,
    question: 'Is there a limit to the number of people who can vote?',
    answer: 'The participant limit depends on your plan. The Basic plan supports up to 50 participants, the Pro plan supports up to 500 participants, and the Enterprise plan offers unlimited participants. You can upgrade your plan at any time if you need to accommodate more voters.'
  },
  {
    id: 5,
    question: 'Can I export the voting results?',
    answer: 'Yes, all plans allow you to export voting results in various formats (CSV, Excel, PDF). The Pro and Enterprise plans also offer advanced analytics and customizable reporting options.'
  },
  {
    id: 6,
    question: 'How do you prevent duplicate voting?',
    answer: 'VoteSecure uses a combination of secure authentication methods, unique voter IDs, and advanced fraud detection algorithms to prevent duplicate voting. Each eligible voter receives a unique, one-time access link or code that can only be used once to cast their vote.'
  },
  {
    id: 7,
    question: 'Is there a mobile app?',
    answer: 'VoteSecure\'s platform is fully responsive and works on all devices including smartphones and tablets. While we don\'t have a dedicated mobile app yet, our web application provides an optimal experience on mobile devices.'
  },
  {
    id: 8,
    question: 'Can I integrate VoteSecure with other tools my organization uses?',
    answer: 'Yes, the Pro and Enterprise plans include API access for custom integrations. The Enterprise plan also offers SSO (Single Sign-On) integration with popular identity providers and custom integration support from our development team.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200 dark:divide-gray-700">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="pt-6">
                <dt className="text-lg">
                  <button
                    className="text-left w-full flex justify-between items-start text-gray-900 dark:text-white focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <svg
                        className={`${openIndex === index ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform transition-transform duration-200 ease-in-out text-indigo-600 dark:text-indigo-400`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd
                  className={`mt-2 pr-12 transition-all duration-200 ease-in-out ${
                    openIndex === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}
                >
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;