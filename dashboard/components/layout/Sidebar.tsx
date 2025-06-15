import { sidebarMenu } from "@/utils/constants";

type SidebarMenuProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Sidebar = ({ activeSection, setActiveSection }: SidebarMenuProps) => {
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
                  <button
                    key={link.key}
                    onClick={() => setActiveSection(link.key)}
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
                    <span
                      className={`mr-3 text-lg relative z-10 transition-all duration-300 ${
                        activeSection === link.key
                          ? "text-blue-400"
                          : "text-white/60 group-hover:text-blue-400"
                      }`}
                    >
                      {link.icon}
                    </span>

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

                    {/* Active indicator */}
                    {activeSection === link.key && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full pulse-glow"></div>
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="glass-card p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 glass-button rounded-full flex items-center justify-center">
              <i className="bx bx-support text-xl text-blue-400"></i>
            </div>
            <h4 className="text-sm font-semibold text-white/80 mb-1">
              Need Help?
            </h4>
            <p className="text-xs text-white/60 mb-3">
              Check our documentation
            </p>
            <button className="glass-button w-full py-2 px-3 text-xs text-white/80 hover:text-white transition-colors duration-300">
              <i className="bx bx-help-circle mr-1"></i>
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
    </div>
  );
};

export default Sidebar;
