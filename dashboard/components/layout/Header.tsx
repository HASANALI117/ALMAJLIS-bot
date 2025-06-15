import { dashboardSections } from "@/utils/constants";

const HeaderComponent = ({ section }: { section: string }) => {
  const config = dashboardSections[section];

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white text-glow mb-2">
            {config.title}
          </h1>
          <p className="text-white/70">{config.description}</p>
        </div>
        <div className="glass-button p-3 rounded-full">
          <i className={`bx ${config.icon} text-2xl text-white/80`}></i>
        </div>
      </div>

      <div className="flex items-center mt-4 text-sm text-white/60">
        <span>Dashboard</span>
        <i className="bx bx-chevron-right mx-2"></i>
        <span className="text-white/80">{config.title}</span>
      </div>
    </div>
  );
};

export default HeaderComponent;
