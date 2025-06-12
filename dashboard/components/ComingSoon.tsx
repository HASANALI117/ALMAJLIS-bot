"use client";

import { useState } from "react";

interface ComingSoonProps {
  featureName: string;
  description?: string;
  expectedDate?: string;
}

const ComingSoon = ({
  featureName,
  description = "This feature is currently under development and will be available soon.",
  expectedDate = "Coming Soon",
}: ComingSoonProps) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifyMe = () => {
    if (email) {
      setSubscribed(true);
      // Here you would typically send the email to your backend
      console.log(
        `Notification requested for ${email} when ${featureName} is ready`
      );
    }
  };

  const upcomingFeatures = [
    {
      icon: "bx-music",
      name: "Music Bot",
      description: "Play music from various sources",
      color: "text-pink-400",
      progress: 75,
    },
    {
      icon: "bx-calendar",
      name: "Event Scheduler",
      description: "Schedule and manage server events",
      color: "text-blue-400",
      progress: 50,
    },
    {
      icon: "bx-trophy",
      name: "Leveling System",
      description: "XP and level tracking for members",
      color: "text-yellow-400",
      progress: 30,
    },
    {
      icon: "bx-store",
      name: "Economy System",
      description: "Virtual currency and shop",
      color: "text-green-400",
      progress: 20,
    },
    {
      icon: "bx-poll",
      name: "Advanced Polls",
      description: "Create detailed polls and surveys",
      color: "text-purple-400",
      progress: 60,
    },
    {
      icon: "bx-shield-alt",
      name: "Advanced Security",
      description: "Enhanced protection features",
      color: "text-red-400",
      progress: 40,
    },
  ];

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

        <h2 className="text-3xl font-bold text-white text-glow mb-3">
          {featureName}
        </h2>

        <p className="text-white/70 mb-6 max-w-md mx-auto">{description}</p>

        <div className="glass-button inline-block px-4 py-2 mb-6">
          <span className="text-sm text-white/80">Expected Release: </span>
          <span className="text-blue-400 font-semibold">{expectedDate}</span>
        </div>

        {/* Notify Me Section */}
        {!subscribed ? (
          <div className="max-w-md mx-auto">
            <p className="text-white/60 mb-4">
              Get notified when this feature is ready!
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 glass-button px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              <button
                onClick={handleNotifyMe}
                className="glass-button px-6 py-3 text-white hover:text-blue-400 font-medium transition-all duration-300 group"
              >
                <i className="bx bx-bell mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                Notify Me
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-4 border border-green-500/30 max-w-md mx-auto">
            <i className="bx bx-check-circle text-green-400 text-2xl mb-2"></i>
            <p className="text-green-400 font-medium">You'll be notified!</p>
            <p className="text-white/60 text-sm">
              We'll email you when {featureName} is ready.
            </p>
          </div>
        )}
      </div>

      {/* Development Roadmap */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-6">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-map text-purple-400"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white text-glow">
              Development Roadmap
            </h3>
            <p className="text-sm text-white/60">
              Upcoming features we're working on
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass-button p-4 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center mb-3">
                <div className="glass-button p-2 rounded-full mr-3">
                  <i className={`bx ${feature.icon} ${feature.color}`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{feature.name}</h4>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Progress</span>
                  <span>{feature.progress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      feature.progress >= 70
                        ? "from-green-500 to-green-400"
                        : feature.progress >= 40
                        ? "from-yellow-500 to-yellow-400"
                        : "from-red-500 to-red-400"
                    } transition-all duration-300`}
                    style={{ width: `${feature.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    feature.progress >= 70
                      ? "bg-green-500/20 text-green-400"
                      : feature.progress >= 40
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {feature.progress >= 70
                    ? "Nearly Ready"
                    : feature.progress >= 40
                    ? "In Progress"
                    : "Planning"}
                </span>
                <button className="text-white/40 hover:text-blue-400 transition-colors duration-300 opacity-0 group-hover:opacity-100">
                  <i className="bx bx-info-circle"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="glass-card p-6">
        <div className="flex items-center mb-6">
          <div className="glass-button p-2 rounded-full mr-3">
            <i className="bx bx-help-circle text-orange-400"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white text-glow">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-white/60">
              Common questions about upcoming features
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "When will these features be available?",
              answer:
                "We're actively working on these features. Release dates depend on testing and user feedback.",
            },
            {
              question: "Can I request a specific feature?",
              answer:
                "Yes! Join our Discord server or contact support to suggest new features.",
            },
            {
              question: "Will these features be free?",
              answer:
                "Most features will be included in the free tier, with some premium features for supporters.",
            },
            {
              question: "How can I stay updated?",
              answer:
                "Follow our social media, join our Discord, or subscribe to notifications above.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="glass-button p-4 hover:bg-white/10 transition-all duration-300"
            >
              <h4 className="text-white font-medium mb-2">{faq.question}</h4>
              <p className="text-white/70 text-sm">{faq.answer}</p>
            </div>
          ))}
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
