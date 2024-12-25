import React from "react";

const MiniLoader = () => {
  return (
    <div className="mini-loader flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="loader ease-linear rounded-full border-4 border-transparent border-t-gray-300 h-7 w-7 animate-spin"></div>
    </div>
  );
};

export default MiniLoader;
