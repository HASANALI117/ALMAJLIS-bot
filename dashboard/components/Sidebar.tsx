import { sidebarMenu } from "../utils/constants";

type SidebarMenuProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Sidebar = ({ activeSection, setActiveSection }: SidebarMenuProps) => {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0 overflow-y-auto">
      {sidebarMenu.map((section) => (
        <div key={section.category}>
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 mt-4 first:mt-0">
            {section.category}
          </div>
          {section.links.map((link) => (
            <a
              key={link.key}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(link.key);
              }}
              className={`px-4 py-2 flex items-center text-sm ${
                activeSection === link.key
                  ? "text-white bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.label}
              {link.badge && (
                <span
                  className={`ml-2 text-xs px-1 rounded ${
                    link.badge === "NEW"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-500 text-white ml-auto px-1.5 py-0.5"
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
