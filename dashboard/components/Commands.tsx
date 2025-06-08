"use client";

import React, { useState } from "react";

const CommandsComponent = () => {
  const [commandPrefix, setCommandPrefix] = useState("!");
  const [commands, setCommands] = useState([
    { name: "help", description: "Show all commands", enabled: true },
    { name: "ban", description: "Ban a user from the server", enabled: true },
    { name: "mute", description: "Mute a user in the server", enabled: true },
    {
      name: "play",
      description: "Play music in voice channel",
      enabled: false,
    },
    {
      name: "clear",
      description: "Clear messages in a channel",
      enabled: true,
    },
  ]);

  const toggleCommand = (index: number) => {
    const updatedCommands = [...commands];
    updatedCommands[index].enabled = !updatedCommands[index].enabled;
    setCommands(updatedCommands);
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Commands
        </h2>
      </div>

      {/* Global Settings */}
      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Global Settings</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Default Command Prefix
          </label>
          <div className="flex">
            <input
              type="text"
              value={commandPrefix}
              onChange={(e) => setCommandPrefix(e.target.value)}
              className="bg-gray-700 rounded-md px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-md ml-2">
              Save
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="enable-all"
            className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
          />
          <label htmlFor="enable-all" className="ml-2 text-sm">
            Enable all commands
          </label>
        </div>
      </div>

      {/* Commands List */}
      <div className="bg-gray-800 rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Commands List</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search commands..."
              className="bg-gray-700 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-2 top-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96">
          <table className="w-full text-left">
            <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-3 px-4">Command</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commands.map((command, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-4 px-4 font-medium">
                    {commandPrefix}
                    {command.name}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {command.description}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        command.enabled
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {command.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleCommand(index)}
                      className={`px-3 py-1 rounded text-xs ${
                        command.enabled
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {command.enabled ? "Disable" : "Enable"}
                    </button>
                    <button className="px-3 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 ml-2">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CommandsComponent;
