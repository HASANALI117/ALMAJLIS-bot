"use client";

import React, { useState } from "react";

const BotSettings = () => {
  const [botName, setBotName] = useState("ALMAJLIS-bot");
  const [prefix, setPrefix] = useState("");
  const [prefixes, setPrefixes] = useState(["!", "/", "?"]);

  // Handler to add a new prefix
  const handleAddPrefix = () => {
    if (prefix && !prefixes.includes(prefix)) {
      setPrefixes([...prefixes, prefix]);
      setPrefix("");
    }
  };

  // Handler to remove a prefix
  const handleRemovePrefix = (prefixToRemove: string) => {
    setPrefixes(prefixes.filter((p) => p !== prefixToRemove));
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          Bot Settings
        </h2>
      </div>

      {/* Nickname Section */}
      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-2">Nickname</h3>
        <p className="text-gray-400 text-sm mb-4">
          Set the bot&apos;s display name in the server.
        </p>
        <div className="flex">
          <input
            type="text"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            className="bg-gray-700 rounded-md px-4 py-2 flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Bot name"
          />
          <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md">
            Apply
          </button>
        </div>
      </div>

      {/* Custom Prefix Section */}
      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-2">Custom Prefix</h3>
        <p className="text-gray-400 text-sm mb-4">Set one or more prefix.</p>
        <div className="flex mb-4">
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="bg-gray-700 rounded-md px-4 py-2 flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter a prefix"
          />
          <button
            onClick={handleAddPrefix}
            className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Prefix List */}
        <div className="space-y-2">
          {prefixes.map((p, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-700 rounded p-3"
            >
              <span>{p}</span>
              <button
                onClick={() => handleRemovePrefix(p)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
