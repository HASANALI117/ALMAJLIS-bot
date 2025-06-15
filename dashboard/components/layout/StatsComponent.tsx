import React from "react";

const StatsComponent = () => {
  const recentActivity = [
    {
      icon: "bx-user-plus",
      text: "New member joined",
      time: "2m ago",
      color: "text-green-400",
    },
    {
      icon: "bx-message",
      text: "Command executed",
      time: "5m ago",
      color: "text-blue-400",
    },
    {
      icon: "bx-shield",
      text: "Auto-mod action",
      time: "10m ago",
      color: "text-red-400",
    },
  ];
  return (
    <div className="w- glass-sidebar border-l border-white/10 p-6 hidden xl:block">
      <div className="space-y-6">
        {/* Server Stats */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white text-glow mb-4">
            Server Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Members</span>
              <span className="text-blue-400 font-bold">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Online</span>
              <span className="text-green-400 font-bold">567</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Channels</span>
              <span className="text-purple-400 font-bold">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Roles</span>
              <span className="text-pink-400 font-bold">15</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white text-glow mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
              >
                <i className={`bx ${activity.icon} ${activity.color}`}></i>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80 truncate">
                    {activity.text}
                  </p>
                  <p className="text-xs text-white/50">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white text-glow mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full glass-button p-3 text-sm text-white/80 hover:text-white transition-colors duration-300 group">
              <i className="bx bx-refresh mr-2 group-hover:rotate-180 transition-transform duration-300"></i>
              Sync Settings
            </button>
            <button className="w-full glass-button p-3 text-sm text-white/80 hover:text-white transition-colors duration-300">
              <i className="bx bx-download mr-2"></i>
              Export Config
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
