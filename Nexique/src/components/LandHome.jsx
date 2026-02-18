import React from "react";
import { ArrowRight, Sparkles, Star, Zap, Shield, ChevronRight } from 'lucide-react';

function LandHome() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-white">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-br from-rose-50 via-white to-purple-50"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-rose-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-l from-blue-100/30 to-rose-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fecaca" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-128px)]">
          
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl px-4 py-2 mb-8 shadow-lg shadow-rose-100/20">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                AI-POWERED SHOPPING
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text bg-[length:200%] animate-gradient">
                Smart
              </span>
              <br />
              <span className="text-gray-900 relative">
                Shopping Assistant
                <div className="absolute -top-6 -right-12 hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <Star className="w-8 h-8 text-rose-500 fill-rose-500 relative" />
                  </div>
                </div>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of e-commerce with our <span className="text-rose-500 font-semibold">AI-integrated platform</span>. 
              Get personalized recommendations, smart price comparisons, and seamless checkout.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
              {[
                { icon: Zap, text: "AI Recommendations", color: "text-yellow-500" },
                { icon: Shield, text: "Secure Payments", color: "text-green-500" },
                { icon: Star, text: "4.9/5 Rating", color: "text-purple-500" },
                { icon: ChevronRight, text: "24/7 Support", color: "text-blue-500" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}-50 to-${feature.color.split('-')[1]}-100`}>
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 px-8 py-4 text-white font-semibold text-lg shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group rounded-2xl border-2 border-gray-200 px-8 py-4 text-gray-700 font-semibold text-lg hover:border-rose-500 hover:text-rose-500 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">from 2k+ reviews</span>
              </div>
              
              {/* User Avatars */}
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 border-2 border-white shadow-lg"
                    style={{ 
                      backgroundImage: `url(https://i.pravatar.cc/100?img=${i})`,
                      backgroundSize: 'cover'
                    }}
                  ></div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600 shadow-lg">
                  +2k
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative order-1 lg:order-2">
            {/* Main showcase card */}
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-600 rounded-[40px] blur-3xl opacity-20 animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl border border-white/50">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <img src="/Nexique2.png" className="w-8 h-8 filter brightness-0 invert" alt="" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Nexique Pro</h3>
                      <p className="text-sm text-gray-500">AI Shopping Assistant</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                    In Stock
                  </div>
                </div>

                {/* Product image placeholder - replace with actual product image */}
                <div className="relative h-48 bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">🛍️</span>
                  </div>
                </div>

                {/* Product details */}
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="text-2xl font-bold text-gray-900">$260.00</span>
                  </div>
                  
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">-</button>
                      <span className="font-medium">1</span>
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">+</button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-4"></div>

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">$230.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-medium">-10% off</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                        $210.00
                      </span>
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-2xl py-4 font-semibold hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <span>Add to Cart</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
                  AI RECOMMENDED
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-10 -left-10 bg-white rounded-2xl p-4 shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Smart Savings</p>
                  <p className="font-bold text-sm">$50 off today</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="font-bold text-sm">4.9/5 Stars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Add keyframe animation for gradient */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default LandHome;
