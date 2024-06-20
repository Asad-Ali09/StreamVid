import React from "react";

const Loading = () => {
  return (
    <div className="z-100 w-full h-full flex items-center justify-center">
      <div className="h-20 w-20 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
