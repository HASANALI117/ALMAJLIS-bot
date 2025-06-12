"use client";

import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen animated-bg floating-orbs relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto">
          {/* Logo Section */}

          {/* Content Section */}
          <div className="text-center lg:text-left glass-card p-12 max-w-xl">
            <h1 className="font-extrabold text-5xl text-white text-glow mb-6">
              ALMAJLIS-BOT
            </h1>

            <div className="flex justify-center items-center mb-8">
              <div className="glass-card p-8 pulse-glow">
                <Image
                  src="/js.jpg"
                  alt="logo"
                  height={240}
                  width={240}
                  className="w-60 h-60 rounded-3xl border-2 border-white/30 shadow-2xl"
                />
              </div>
            </div>

            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/discord`}
              className="glass-button w-full py-4 px-8 flex justify-center items-center text-white font-semibold text-lg group relative overflow-hidden"
            >
              {/* Button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <i className="bx bxl-discord-alt text-3xl mr-3 relative z-10"></i>
              <span className="relative z-10">Login with Discord</span>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Feature indicators */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {["🛡️ Secure", "⚡ Fast", "🎨 Modern"].map((feature, index) => (
                <div key={index} className="glass-card p-3 text-center">
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
