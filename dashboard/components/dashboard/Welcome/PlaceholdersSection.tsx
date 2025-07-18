import React from "react";
import { placeholders } from "@/utils/messageUtils";

const PlaceholdersSection = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-4">
        <div className="glass-button p-2 rounded-full mr-3">
          <i className="bx bx-code text-blue-400"></i>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">
            Message Placeholders
          </h4>
          <p className="text-sm text-white/60">
            Use these placeholders in your messages
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {placeholders.map((item, index) => (
          <div
            key={index}
            className="glass-button p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300 group"
          >
            <div>
              <code className="text-blue-400 font-mono text-sm bg-black/30 px-2 py-1 rounded">
                {item.placeholder}
              </code>
              <p className="text-white/60 text-sm mt-1">{item.description}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(item.placeholder)}
              className="glass-button p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-blue-400"
            >
              <i className="bx bx-copy"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceholdersSection;
