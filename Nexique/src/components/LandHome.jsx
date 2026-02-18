import React from "react";
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';

function LandHome() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff9f9] via-white to-[#fff0f5]">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#ff7373]/20 to-[#ff3c8a]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#6366f1]/20 to-[#ff7373]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#ff7373]/10 to-[#ff3c8a]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#ff7373]/20 rounded-full px-4 py-2 mb-8 shadow-lg">
              <Zap className="w-4 h-4 text-[#ff7373]" />
              <span className="text-sm font-medium text-gray-600">The Future of Shopping is Here</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] text-transparent bg-clip-text">
                AI-Powered
              </span>
              <br />
              <span className="text-gray-900">Shopping Experience</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover a revolutionary way to shop with our AI-integrated platform. 
              Personalized recommendations, smart comparisons, and seamless checkout.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] px-8 py-4 text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-[#ff7373]/30 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff3c8a] to-[#ff7373] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group rounded-full border-2 border-gray-200 px-8 py-4 text-gray-700 font-semibold hover:border-[#ff7373] hover:text-[#ff7373] transition-all duration-300 bg-white/50 backdrop-blur-sm">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ff7373]" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#ff7373]" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] border-2 border-white"></div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                  +2k
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Images */}
          <div className="relative order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Background Blur */}
            <div className="absolute w-full h-full bg-gradient-to-r from-[#ff7373]/20 to-[#ff3c8a]/20 rounded-full blur-3xl"></div>
            
            {/* Phone Images */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-6">
              {/* First Phone */}
              <div className="relative transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-110 z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] rounded-[2rem] blur-md opacity-50"></div>
                <img 
                  src="/testphone1.png" 
                  className="relative w-40 sm:w-48 lg:w-56 rounded-[1.5rem] shadow-2xl border-4 border-white"
                  alt="Shopping App"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                </div>
              </div>

              {/* Second Phone */}
              <div className="relative transform rotate-6 translate-y-8 hover:rotate-0 hover:-translate-y-0 transition-all duration-500 hover:scale-110 z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#ff7373] rounded-[2rem] blur-md opacity-50"></div>
                <img 
                  src="/testphone2.png" 
                  className="relative w-40 sm:w-48 lg:w-56 rounded-[1.5rem] shadow-2xl border-4 border-white"
                  alt="Shopping App"
                />
                <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#ff7373] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">4.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-xl animate-bounce">
              <p className="text-sm font-medium">🔥 50% OFF</p>
            </div>
            <div className="absolute bottom-20 right-10 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-xl animate-bounce delay-300">
              <p className="text-sm font-medium">✨ New Arrivals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default LandHome;
