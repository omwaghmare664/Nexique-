import React from "react";

function LandHome() {
  return (
    <div className="w-full min-h-screen relative ">

      <div className="top-content w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff0f0] to-white">
        <div className="flex flex-col items-center justify-center w-full h-full absolute z-30 pointer-events-none">
          <h1 className="text-[120px] font-bold text-[#ff7373]  landmaintextshadow bg-gradient-to-r from-[#ff7373] to-[#ff3c8a] text-transparent bg-clip-text animate-bounce-in">Want?</h1>
          <h2 className="text-[31px]  font-medium -mt-5 ">A <span className="text-[#fc6363]">Powerful</span> <span className="text-[#6366f1] font-bold tracking-wide text-[36px]">AI Intergrated</span> Shopping!</h2>
        </div>  
        <div className="realview w-[55%] h-full absolute z-10 flex items-center justify-between ">
          <div className="absolute top-[70%] left-[50%] setanchor z-20 w-[800px] h-[300px] bg-white blur-[60px]"></div>
         
    <div className="absolute left-[10%] w-[600px] h-[200px] bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-40 z-20"></div>

          <img src="/testphone1.png" className="realimg1 hover:scale-105 hover:rotate-2 transition duration-500 w-60 rounded-[20px] shadow-2xl shadow-[#ff6b6b]/40" alt="" />
          <img src="/testphone2.png" className="realimg2  -translate-y-25 hover:scale-105 hover:rotate-2 transition duration-500 w-60 rounded-[20px] shadow-2xl shadow-[#ff6b6b]/40" alt="" />
        </div>
      </div>

    </div>
  );
}

export default LandHome;
