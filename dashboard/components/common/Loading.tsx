import React from "react";

interface LoadingProps {
  title?: string;
  message?: string;
}

const Loading = ({ title, message }: LoadingProps) => {
  return (
    <div className="flex flex-col h-screen animated-bg floating-orbs relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="glass-loader text-center">
          <div className="relative mb-6">
            <i className="bx bx-loader-alt bx-spin text-6xl text-white"></i>
            <div className="absolute inset-0 animate-ping">
              <i className="bx bx-loader-alt text-6xl text-blue-400/30"></i>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-glow mb-2">
            {title || "Loading..."}
          </h2>
          <p className="text-white/70">
            {message || "Loading, please wait..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
