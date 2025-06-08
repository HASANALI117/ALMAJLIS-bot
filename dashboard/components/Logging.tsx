"use client";

import React, { useState } from "react";

const LoggingComponent = () => {
  const [loggingEnabled, setLoggingEnabled] = useState(true);

  const logEvents = [
    { name: "Message Delete", enabled: true },
    { name: "Message Edit", enabled: true },
    { name: "Member Join", enabled: true },
    { name: "Member Leave", enabled: false },
    { name: "Member Ban", enabled: true },
    { name: "Member Unban", enabled: true },
    { name: "Channel Create", enabled: false },
    { name: "Channel Delete", enabled: false },
    { name: "Role Create", enabled: false },
    { name: "Role Delete", enabled: false },
  ];

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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Logging
        </h2>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Logging Status</h3>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="toggle-logging"
              checked={loggingEnabled}
              onChange={() => setLoggingEnabled(!loggingEnabled)}
              className="sr-only"
            />
            <label
              htmlFor="toggle-logging"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                loggingEnabled ? "bg-cyan-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                  loggingEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Log Channel
          </label>
          <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Select a channel</option>
            <option>#mod-logs</option>
            <option>#server-logs</option>
            <option>#audit-logs</option>
          </select>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-400">
              Log Format
            </label>
            <span className="text-xs text-cyan-400">Premium feature</span>
          </div>
          <select
            disabled
            className="bg-gray-700 opacity-60 rounded-md px-4 py-2 w-full focus:outline-none"
          >
            <option>Embed (Default)</option>
            <option>Text</option>
            <option>Compact</option>
            <option>Detailed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Log Retention
          </label>
          <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>7 days</option>
            <option>14 days</option>
            <option>30 days</option>
            <option>90 days</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Logged Events</h3>
        <p className="text-gray-400 text-sm mb-4">
          Select which events should be logged in the server logs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 rounded-md p-3"
            >
              <span className="text-sm">{event.name}</span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id={`toggle-${index}`}
                  defaultChecked={event.enabled}
                  className="sr-only"
                />
                <label
                  htmlFor={`toggle-${index}`}
                  className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                    event.enabled ? "bg-cyan-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                      event.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mr-2">
            Reset to Default
          </button>
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-md">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoggingComponent;
