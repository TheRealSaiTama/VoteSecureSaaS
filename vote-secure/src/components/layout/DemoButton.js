import React, { useState, useEffect } from 'react';
import DemoModal from './DemoModal';
import VimeoPlayer from './VimeoPlayer';

const DemoButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Replace with your actual Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfxKfZJA_zu8UcOH776knAtzvsUNyPZ_iuf1A0MsbBx7MuhMg/viewform?usp=dialog";
  
  // Your Vimeo video URL
  const demoVideoUrl = "https://vimeo.com/1073726196/a27a7c1e54";
  
  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleFormClick = () => {
    window.open(googleFormUrl, '_blank');
    setIsModalOpen(false);
  };

  const handleVideoClick = () => {
    setIsModalOpen(false);
    setIsVideoOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center z-40 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
        aria-label="Book your demo"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        Book Your Demo
      </button>

      <DemoModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onFormClick={handleFormClick}
        onVideoClick={handleVideoClick}
      />

      {isVideoOpen && (
        <VimeoPlayer 
          videoUrl={demoVideoUrl}
          onClose={closeVideo}
        />
      )}
    </>
  );
};

export default DemoButton;