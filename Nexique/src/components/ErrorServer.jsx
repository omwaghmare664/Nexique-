import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import a modern error icon

const ErrorServer = ({error}) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="text-center max-w-md w-full">
        <div className='flex items-center justify-center flex-col gap-4'>
            {/* Error Icon */}
        <FaExclamationTriangle className="text-red-500 text-6xl mb-6" />
        
        {/* Error Message */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Something Went Wrong
        </h1>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          {error}
        </p>
        
        {/* Action Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            Reload Page
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorServer;
