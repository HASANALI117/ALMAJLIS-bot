const ComingSoon = () => {
  return (
    <div className="space-y-6">
      {/* Main Coming Soon Card */}
      <div className="glass-card p-8 text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto glass-button rounded-full flex items-center justify-center pulse-glow">
            <i className="bx bx-time text-4xl text-blue-400"></i>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <i className="bx bx-loader-alt bx-spin text-white text-sm"></i>
          </div>
        </div>

        <p className="text-white/70 mb-6 max-w-md mx-auto">
          This feature is currently under development and will be available
          soon.
        </p>

        <div className="glass-button inline-block px-4 py-2 mb-6">
          <span className="text-sm text-white/80">Expected Release: </span>
          <span className="text-blue-400 font-semibold">Coming Soon</span>
        </div>
      </div>

      {/* Support Section */}
      <div className="glass-card p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="glass-button p-3 rounded-full mr-3">
            <i className="bx bx-heart text-pink-400 text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-white text-glow">
            Support Development
          </h3>
        </div>

        <p className="text-white/70 mb-4">
          Help us build these features faster by supporting our development
          team!
        </p>

        <div className="flex justify-center gap-3">
          <button className="glass-button px-6 py-3 text-white hover:text-pink-400 transition-all duration-300 group">
            <i className="bx bx-donate-heart mr-2 group-hover:scale-110 transition-transform duration-300"></i>
            Support Us
          </button>
          <button className="glass-button px-6 py-3 text-white hover:text-blue-400 transition-all duration-300 group">
            <i className="bx bxl-discord-alt mr-2 group-hover:scale-110 transition-transform duration-300"></i>
            Join Discord
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
