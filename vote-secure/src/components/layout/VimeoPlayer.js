import React from 'react';

const VimeoPlayer = ({ videoUrl, onClose }) => {
  // For a URL like https://vimeo.com/1073726196/a27a7c1e54
  // The proper embed format should be https://player.vimeo.com/video/1073726196?h=a27a7c1e54

  const getEmbedUrl = (url) => {
    try {
      // Extract ID and hash parts
      const parts = url.split('/');
      if (parts.length >= 5) { // Make sure we have enough parts
        const videoId = parts[3];
        const hash = parts[4];
        
        if (videoId && hash) {
          return `https://player.vimeo.com/video/${videoId}?h=${hash}&autoplay=1&title=0&byline=0&portrait=0`;
        }
      }
      // Fallback for direct embed with the full path
      const videoIdPath = url.split('vimeo.com/')[1];
      if (videoIdPath) {
        return `https://player.vimeo.com/video/${videoIdPath}?autoplay=1&title=0&byline=0&portrait=0`;
      }
    } catch (err) {
      console.error("Error processing Vimeo URL:", err);
    }
    return '';
  };

  const embedUrl = getEmbedUrl(videoUrl);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8">
      <div 
        className="fixed inset-0 bg-black opacity-80"
        onClick={onClose}
      ></div>
      <div className="bg-black rounded-lg w-full h-full max-w-5xl max-h-[80vh] z-50 shadow-xl relative flex flex-col">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
          aria-label="Close"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex-1 w-full h-full relative">
          {embedUrl ? (
            <iframe
              className="absolute inset-0 w-full h-full rounded"
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Demo Video"
            ></iframe>
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white bg-gray-900 rounded">
              Unable to load video. Please check the Vimeo URL format.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VimeoPlayer;