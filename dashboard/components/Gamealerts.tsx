"use client";

import React, { useState } from "react";

const GameAlertComponent = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [games, setGames] = useState([
    { name: "Minecraft", enabled: true },
    { name: "Valorant", enabled: true },
    { name: "League of Legends", enabled: false },
    { name: "Among Us", enabled: true },
  ]);

  const toggleGame = (index: number) => {
    const updatedGames = [...games];
    updatedGames[index].enabled = !updatedGames[index].enabled;
    setGames(updatedGames);
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
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Game Alert
          <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-500 rounded">
            NEW
          </span>
        </h2>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Game Alerts</h3>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="toggle-alerts"
              checked={alertsEnabled}
              onChange={() => setAlertsEnabled(!alertsEnabled)}
              className="sr-only"
            />
            <label
              htmlFor="toggle-alerts"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                alertsEnabled ? "bg-cyan-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                  alertsEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          Send automatic notifications when members start playing games.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Alert Channel
          </label>
          <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Select channel</option>
            <option>#gaming</option>
            <option>#general</option>
            <option>#looking-to-play</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Alert Format
          </label>
          <textarea
            className="bg-gray-700 rounded-md px-4 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            defaultValue="{username} just started playing {game}! Who wants to join?"
          ></textarea>
          <p className="text-xs text-gray-400 mt-2">
            Available variables: {"{username}"}, {"{game}"}, {"{time}"}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-400">
              Minimum Group Size
            </label>
            <span className="text-sm text-gray-400">Requires 2 players</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            defaultValue="2"
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5+</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Monitored Games</h3>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Add a new game..."
              className="bg-gray-700 rounded-md px-4 py-2 pr-8 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button className="absolute right-2 top-2 text-cyan-500 hover:text-cyan-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {games.map((game, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-700 rounded p-3"
            >
              <span>{game.name}</span>
              <div className="relative inline-block w-10 align-middle select-none">
                <input
                  type="checkbox"
                  id={`toggle-game-${index}`}
                  checked={game.enabled}
                  onChange={() => toggleGame(index)}
                  className="sr-only"
                />
                <label
                  htmlFor={`toggle-game-${index}`}
                  className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                    game.enabled ? "bg-cyan-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                      game.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-md">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
export default GameAlertComponent;
