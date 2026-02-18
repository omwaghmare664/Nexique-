import React from "react";

function LandHome() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-b from-[#fff0f0] to-white">
      
      {/* Background decorative elements - only visual, no logic */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="top-content w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 md:px-8">
        
        {/* Text Content */}
        <div className="flex flex-col items-center justify-center w-full text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] font-bold mb-2 animate-bounce-in">
            <span className="bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] text-transparent bg-clip-text">
              Want?
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[31px] font-medium px-4">
            A <span className="text-[#fc6363]">Powerful</span>{" "}
            <span className="text-[#6366f1] font-bold tracking-wide text-2xl sm:text-3xl md:text-[36px]">
              AI Integrated
            </span>{" "}
            Shopping!
          </h2>
        </div>

        {/* Phone Images */}
        <div className="realview w-full max-w-4xl mx-auto relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
          
          {/* Blur background effect - visual only */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-48 bg-white blur-[60px]"></div>
          
          {/* Gradient blur - visual only */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-40"></div>

          {/* First Phone */}
          <div className="relative group">
            <img 
              src="/testphone1.png" 
              className="realimg1 w-40 sm:w-48 md:w-56 lg:w-60 rounded-[20px] shadow-2xl shadow-[#ff6b6b]/40 transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500" 
              alt="Shopping App Preview" 
            />
          </div>

          {/* Second Phone */}
          <div className="relative group -mt-4 sm:mt-0 sm:-translate-y-8">
            <img 
              src="/testphone2.png" 
              className="realimg2 w-40 sm:w-48 md:w-56 lg:w-60 rounded-[20px] shadow-2xl shadow-[#ff6b6b]/40 transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500" 
              alt="Shopping App Features" 
            />
          </div>
        </div>

        {/* Mobile-friendly text adjustment */}
        <p className="mt-8 text-sm sm:text-base text-gray-600 text-center max-w-md px-4">
          Experience the future of shopping with AI-powered recommendations
        </p>
      </div>
    </div>
  );
}

export default LandHome;
