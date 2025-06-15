"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useGuilds } from "@/contexts/index";

const GuildsList = () => {
  const { guilds, loading } = useGuilds();

  console.log("Guilds:", guilds);

  const handleInvite = async (guildId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/dashboard/invite-bot/${guildId}`,
        { withCredentials: true }
      );

      window.location.href = response.data.inviteURL;
    } catch (error) {
      console.error("Error inviting bot:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen animated-bg floating-orbs relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="glass-loader text-center">
            <i className="bx bx-loader-alt bx-spin text-6xl text-white mb-4"></i>
            <p className="text-xl text-white/80">Loading your servers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!guilds.length) {
    return (
      <div className="min-h-screen animated-bg floating-orbs relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="glass-card p-12 text-center max-w-md">
            <div className="mb-6">
              <i className="bx bx-server text-6xl text-white/60"></i>
            </div>
            <h2 className="text-3xl font-bold text-white text-glow mb-4">
              No Servers Found
            </h2>
            <p className="text-lg text-white/70 mb-6">
              You don't have any servers with the required permissions.
            </p>
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/discord`}
              className="glass-button w-full py-3 px-6 flex justify-center items-center text-white font-semibold group"
            >
              <i className="bx bx-refresh mr-2 group-hover:rotate-180 transition-transform duration-300"></i>
              Refresh Permissions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg floating-orbs relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-5xl text-white text-glow mb-4">
            Select a Server
          </h1>
          <p className="text-xl text-white/70">
            Choose a server to configure your bot settings
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Guilds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {guilds.map((guild, index) => (
            <Link
              href={`/dashboard/${guild.id}`}
              key={guild.id}
              className="glass-card p-6 text-center group relative overflow-hidden transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Server Icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto relative">
                    <Image
                      src={
                        guild.icon
                          ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                          : `/default-server-icon.png` // You'll need a default icon
                      }
                      alt={guild.name}
                      fill
                      className="rounded-full border-3 border-white/30 group-hover:border-white/50 transition-all duration-300 object-cover"
                    />
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"></div>
                  </div>

                  {/* Online indicator */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white/50 pulse-glow"></div>
                </div>

                {/* Server Name */}
                <h2 className="font-bold text-xl text-white group-hover:text-glow-blue transition-all duration-300 mb-2 truncate">
                  {guild.name}
                </h2>

                {/* Server Stats */}
                <div className="glass-dark p-3 rounded-lg mb-4">
                  <div className="flex justify-between text-sm text-white/70">
                    <span>Members</span>
                    <span className="text-blue-400 font-semibold">
                      {Math.floor(Math.random() * 1000) + 100}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-white/70 mt-1">
                    <span>Online</span>
                    <span className="text-green-400 font-semibold">
                      {Math.floor(Math.random() * 200) + 50}
                    </span>
                  </div>
                </div>

                {/* Configure button */}
                <div className="glass-button w-full py-2 px-4 text-sm font-medium text-white/90 group-hover:text-white group-hover:bg-white/20 transition-all duration-300">
                  <i className="bx bx-cog mr-2"></i>
                  Configure Bot
                </div>
              </div>

              {/* Hover decoration */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="bx bx-right-arrow-alt text-white/60 text-xl"></i>
              </div>
            </Link>
          ))}
        </div>

        {/* Add Server Card */}
        <div className="mt-8 flex justify-center">
          <div className="glass-card p-6 text-center group cursor-pointer max-w-sm border-dashed border-2 border-white/20 hover:border-white/40 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 glass-button rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <i className="bx bx-plus text-3xl text-white/70 group-hover:text-white"></i>
            </div>
            <h3 className="text-lg font-semibold text-white/80 group-hover:text-white mb-2">
              Add New Server
            </h3>
            <p className="text-sm text-white/60">
              Invite the bot to another server
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GuildsList;
