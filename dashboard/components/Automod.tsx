"use client";

import React, { useState } from "react";

const AutomodComponent = () => {
  const [automodEnabled, setAutomodEnabled] = useState(true);

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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Automod
        </h2>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Automod Status</h3>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="toggle-automod"
              checked={automodEnabled}
              onChange={() => setAutomodEnabled(!automodEnabled)}
              className="sr-only"
            />
            <label
              htmlFor="toggle-automod"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                automodEnabled ? "bg-cyan-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                  automodEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          {automodEnabled
            ? "Automod is currently enabled and actively monitoring your server."
            : "Automod is disabled. Enable it to automatically moderate your server."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Anti-Spam</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm">Enable anti-spam</label>
              <input
                type="checkbox"
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Max messages per 5 seconds
              </label>
              <input
                type="number"
                min="1"
                max="10"
                defaultValue="5"
                className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Action</label>
              <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Delete message</option>
                <option>Warn user</option>
                <option>Mute user (5 minutes)</option>
                <option>Kick user</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Word Filter</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm">Enable word filter</label>
              <input
                type="checkbox"
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Banned words (one per line)
              </label>
              <textarea
                className="bg-gray-700 rounded-md px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter banned words or phrases..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Action</label>
              <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Delete message</option>
                <option>Warn user</option>
                <option>Mute user (5 minutes)</option>
                <option>Kick user</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Link Filter</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm">Enable link filter</label>
              <input
                type="checkbox"
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Select what to filter
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="filter-discord"
                    className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                  />
                  <label htmlFor="filter-discord" className="ml-2 text-sm">
                    Discord invites
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="filter-all"
                    className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                  />
                  <label htmlFor="filter-all" className="ml-2 text-sm">
                    All links
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="filter-custom"
                    className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                  />
                  <label htmlFor="filter-custom" className="ml-2 text-sm">
                    Custom domains (whitelist)
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Whitelisted domains (one per line)
              </label>
              <textarea
                className="bg-gray-700 rounded-md px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="example.com"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-md p-6">
          <h3 className="text-lg font-medium mb-4">Raid Protection</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm">Enable raid protection</label>
              <input
                type="checkbox"
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Join rate threshold (users per minute)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                defaultValue="10"
                className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Action</label>
              <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Alert moderators</option>
                <option>Enable verification for new users</option>
                <option>Enable server lockdown</option>
                <option>Ban new users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Alert channel
              </label>
              <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Select channel</option>
                <option>#mod-logs</option>
                <option>#admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-md">
          Save Settings
        </button>
      </div>
    </div>
  );
};
export default AutomodComponent;
