"use client";

import React, { useState } from "react";

const WelcomeComponent = () => {
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [leaveEnabled, setLeaveEnabled] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to the server, {user}! Please read the rules in {channel:rules}."
  );

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
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
          Welcome
        </h2>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Welcome Messages</h3>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="toggle-welcome"
              checked={welcomeEnabled}
              onChange={() => setWelcomeEnabled(!welcomeEnabled)}
              className="sr-only"
            />
            <label
              htmlFor="toggle-welcome"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                welcomeEnabled ? "bg-cyan-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                  welcomeEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Welcome Channel
          </label>
          <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Select channel</option>
            <option>#welcome</option>
            <option>#general</option>
            <option>#introductions</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Welcome Message
          </label>
          <textarea
            className="bg-gray-700 rounded-md px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter welcome message here..."
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
          ></textarea>
          <p className="text-xs text-gray-400 mt-2">
            Available variables: {"{user}"} (mentions the user), {"{username}"}{" "}
            (user&apos;s name), {"{server}"} (server name), {"{membercount}"}{" "}
            (member count), {"{channel:name}"} (channel mention)
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Message Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-md p-4 border-2 border-cyan-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Basic</span>
                <input
                  type="radio"
                  name="style"
                  defaultChecked
                  className="text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                />
              </div>
              <div className="bg-gray-800 rounded p-2 text-xs">
                Welcome to the server, @user!
              </div>
            </div>
            <div className="bg-gray-700 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Embed</span>
                <input
                  type="radio"
                  name="style"
                  className="text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
                />
              </div>
              <div className="bg-gray-800 border-l-4 border-cyan-500 rounded p-2 text-xs">
                Welcome to the server, @user!
              </div>
            </div>
            <div className="bg-gray-700 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Image</span>
                <span className="text-xs text-cyan-400">Premium</span>
              </div>
              <div className="bg-gray-800 rounded p-2 text-xs text-center opacity-75">
                Custom welcome image
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Leave Messages</h3>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="toggle-leave"
              checked={leaveEnabled}
              onChange={() => setLeaveEnabled(!leaveEnabled)}
              className="sr-only"
            />
            <label
              htmlFor="toggle-leave"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                leaveEnabled ? "bg-cyan-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                  leaveEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Leave Channel
          </label>
          <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Same as welcome channel</option>
            <option>#general</option>
            <option>#mod-logs</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Leave Message
          </label>
          <textarea
            className="bg-gray-700 rounded-md px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter leave message here..."
            defaultValue="{username} has left the server. We now have {membercount} members."
          ></textarea>
          <p className="text-xs text-gray-400 mt-2">
            Available variables: {"{username}"} (user&apos;s name), {"{server}"}{" "}
            (server name), {"{membercount}"} (member count)
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Join Roles</h3>
          <span className="text-xs text-cyan-400">Premium feature</span>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          Automatically assign roles to new members when they join the server.
        </p>

        <div className="opacity-60">
          <div className="flex mb-4">
            <select
              disabled
              className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none"
            >
              <option>Select role to add</option>
              <option>Member</option>
              <option>Newcomer</option>
              <option>Verified</option>
            </select>
            <button disabled className="bg-gray-700 px-4 py-2 rounded-md ml-2">
              Add
            </button>
          </div>

          <div className="text-center py-6 border-2 border-dashed border-gray-700 rounded-md">
            <p className="text-sm text-gray-400">No auto roles configured</p>
            <p className="text-xs text-gray-500 mt-1">
              Upgrade to Premium to use this feature
            </p>
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
export default WelcomeComponent;
