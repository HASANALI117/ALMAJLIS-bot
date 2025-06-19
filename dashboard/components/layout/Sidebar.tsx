"use client";

import { useParams, usePathname } from "next/navigation";
import { sidebarMenu } from "@/utils/constants";
import Link from "next/link";

const Sidebar = () => {
  const { guildId } = useParams();
  const pathname = usePathname();

  const getActiveSection = () => {
    const segments = pathname.split("/");
    return segments[segments.length - 1] || "bot-settings";
  };

  const activeSection = getActiveSection();
  return (
    <div className="w-64 glass-sidebar flex-shrink-0 overflow-y-auto glass-scroll border-r border-white/10">
      <div className="p-4">
        {/* Sidebar Header */}
        <div className="glass-card p-4 mb-6">
          <h2 className="text-lg font-bold text-white text-glow mb-1">
            Dashboard
          </h2>
          <p className="text-sm text-white/60">Server Configuration</p>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4">
          {sidebarMenu.map((section) => (
            <div key={section.category} className="space-y-2">
              {/* Category Header */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                  {section.category}
                </h3>
                <div className="w-8 h-px bg-gradient-to-r from-blue-500/50 to-transparent mt-1"></div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                {section.links.map((link) => (
                  <Link
                    key={link.key}
                    href={`/dashboard/${guildId}/${link.key}`}
                    className={`w-full px-4 py-3 flex items-center text-sm transition-all duration-300 rounded-xl group relative overflow-hidden ${
                      activeSection === link.key
                        ? "glass-button text-white bg-white/15 border-white/30 text-glow-blue"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* Background gradient for active item */}
                    {activeSection === link.key && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/20 opacity-50"></div>
                    )}

                    {/* Icon */}
                    <i
                      className={`bx ${
                        link.icon
                      } mr-3 text-lg relative z-10 transition-all duration-300 ${
                        activeSection === link.key
                          ? "text-blue-400"
                          : "text-white/60 group-hover:text-blue-400"
                      }`}
                    ></i>

                    {/* Label */}
                    <span className="relative z-10 font-medium flex-1 text-left">
                      {link.label}
                    </span>

                    {/* Badge */}
                    {link.badge && (
                      <span className="relative z-10 ml-2 text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold pulse-glow">
                        {link.badge}
                      </span>
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

export default Sidebar;
