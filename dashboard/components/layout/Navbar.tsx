"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/utils/constants";
import { useAuth, useGuild } from "@/contexts";
import Loading from "@/components/common/Loading";

const Navbar = () => {
  const { user, loading } = useAuth();
  const { guild } = useGuild();
  console.log("Rendering Navbar", { user, guild });

  if (loading) {
    return (
      <Loading
        title="Loading Dashboard"
        message="Preparing your server configuration..."
      />
    );
  }

  return (
    <nav className="glass-nav sticky top-0 z-50 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/js.jpg"
                alt="logo"
                width={50}
                height={50}
                className="rounded-xl border-2 border-white/30 transition-all duration-300 group-hover:border-white/50 group-hover:shadow-lg"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <h1 className="ml-3 font-bold text-xl text-white text-glow group-hover:text-glow-blue transition-all duration-300">
              ALMAJLIS-BOT
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="glass-button px-4 py-2 flex items-center text-white/90 hover:text-white text-sm font-medium group"
              >
                <i
                  className={`bx ${item.icon} mr-2 text-lg group-hover:text-blue-400 transition-colors duration-300`}
                ></i>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right side - User info */}
        <div className="flex items-center">
          {loading ? (
            <div className="glass-loader">
              <i className="bx bx-loader-alt bx-spin text-2xl text-white"></i>
            </div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              {/* Guild Info */}
              {guild && guild.id && (
                <div className="glass-card px-4 py-2 flex items-center group">
                  <div className="relative">
                    <Image
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                      alt="Guild Icon"
                      className="h-10 w-10 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-300"
                      width={40}
                      height={40}
                    />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <h2 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                      {guild.name}
                    </h2>
                    <p className="text-xs text-white/60">Server</p>
                  </div>
                </div>
              )}

              {/* User Info */}
              <div className="glass-card px-4 py-2 flex items-center group">
                <div className="relative">
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-300"
                    width={40}
                    height={40}
                  />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 pulse-glow"></div>
                </div>
                <div className="ml-3 hidden sm:block">
                  <h2 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                    {user.global_name}
                  </h2>
                  <p className="text-xs text-white/60">Administrator</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="glass-button p-2 text-white">
            <i className="bx bx-menu text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </nav>
  );
};

export default Navbar;
