// import React, { useState } from "react";

const WebLogsComponent = () => {
  // const [logEvents, setLogEvents] = useState([
  //   {
  //     type: "info",
  //     timestamp: "2024-11-15 14:32:11",
  //     message: "Bot started successfully",
  //   },
  //   {
  //     type: "warning",
  //     timestamp: "2024-11-15 14:35:22",
  //     message: "API rate limit approaching",
  //   },
  //   {
  //     type: "error",
  //     timestamp: "2024-11-15 15:01:45",
  //     message: "Failed to connect to voice channel",
  //   },
  //   {
  //     type: "info",
  //     timestamp: "2024-11-15 15:10:33",
  //     message: "New server joined: Gaming Lounge",
  //   },
  // ]);

  // Sample data for recent actions
  const recentActions = [
    {
      executed: "2024-11-15 21:41:26",
      username: "user",
      action: "greetings update",
    },
    {
      executed: "2024-11-15 08:21:11",
      username: "user",
      action: "greetings update",
    },
    {
      executed: "2024-11-15 08:20:51",
      username: "user",
      action: "settings update",
    },
  ];

  return (
    <div className="flex h-full">
      {/* Main Logs Content */}
      <div className="flex-1 p-8 overflow-y-auto">
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
            Web Logs
          </h2>
        </div>

        {/* Log Level Filter */}
        <div className="bg-gray-800 rounded-md p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Log Levels</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="info-logs"
                defaultChecked
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="info-logs" className="ml-2">
                Info
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="warning-logs"
                defaultChecked
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="warning-logs" className="ml-2">
                Warning
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="error-logs"
                defaultChecked
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="error-logs" className="ml-2">
                Error
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="debug-logs"
                className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="debug-logs" className="ml-2">
                Debug
              </label>
            </div>
          </div>
        </div>

        {/* Log Table */}
        <div className="bg-gray-800 rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Log Events</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search logs..."
                className="bg-gray-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button className="bg-gray-700 hover:bg-gray-600 p-1 rounded">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-1 rounded">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 p-1 rounded">
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Level</th>
                  <th className="py-3 px-4 text-left">Timestamp</th>
                  <th className="py-3 px-4 text-left">Message</th>
                </tr>
              </thead>
              {/* <tbody>
                {logEvents.map((log, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.type === "info"
                            ? "bg-blue-900 text-blue-300"
                            : log.type === "warning"
                            ? "bg-yellow-900 text-yellow-300"
                            : log.type === "error"
                            ? "bg-red-900 text-red-300"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{log.timestamp}</td>
                    <td className="py-3 px-4">{log.message}</td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <div>Showing 1-4 of 4 entries</div>
            <div className="flex space-x-1">
              <button
                className="px-3 py-1 bg-gray-700 rounded-md disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-cyan-600 text-white rounded-md">
                1
              </button>
              <button
                className="px-3 py-1 bg-gray-700 rounded-md disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Actions Panel - Now only in WebLogs section */}
      <div className="w-80 border-l border-gray-700 p-4 overflow-y-auto">
        <h3 className="text-lg font-medium mb-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          Recent actions
        </h3>

        <div className="mb-4">
          <div className="grid grid-cols-3 mb-2 text-xs font-medium text-gray-400">
            <div className="col-span-1">Executed?</div>
            <div className="col-span-1">Username?</div>
            <div className="col-span-1">Action?</div>
          </div>

          <div className="mb-2">
            <input
              type="text"
              className="bg-gray-700 rounded-md px-3 py-1 w-full text-sm mb-1 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Filter by Username"
            />
            <input
              type="text"
              className="bg-gray-700 rounded-md px-3 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Filter by Action"
            />
          </div>

          <div className="space-y-2 mt-4">
            {recentActions.map((action, index) => (
              <div
                key={index}
                className="grid grid-cols-3 text-xs py-1 border-b border-gray-700"
              >
                <div className="col-span-1 text-gray-400">
                  {action.executed}
                </div>
                <div className="col-span-1">{action.username}</div>
                <div className="col-span-1">{action.action}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">
            3 records
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebLogsComponent;
