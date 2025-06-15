"use client";

import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatsComponent from "./StatsComponent";

const DashboardShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen animated-bg floating-orbs relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8663.jpg?ga=GA1.1.1876001768.1749711470&semt=ais_hybrid&w=740')] bg-no-repeat bg-center bg-cover"></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Dashboard Content */}
          <div className="flex-1 relative">
            <div className="glass-scroll overflow-y-auto h-full">
              <div className="p-8">{children}</div>
            </div>
          </div>

          {/* Stats Panel */}
          <StatsComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
