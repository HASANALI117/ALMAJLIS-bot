const ReactionRolesComponent = () => {
  const roleMessages = [
    {
      id: 1,
      name: "Color Roles",
      channel: "#role-selection",
      messageContent: "React to get colored roles!",
      reactions: [
        { emoji: "🔴", role: "Red", count: 24 },
        { emoji: "🟢", role: "Green", count: 18 },
        { emoji: "🟣", role: "Purple", count: 31 },
      ],
    },
    {
      id: 2,
      name: "Game Roles",
      channel: "#gaming",
      messageContent: "React to show what games you play!",
      reactions: [
        { emoji: "⚔️", role: "Minecraft", count: 42 },
        { emoji: "🔫", role: "Valorant", count: 37 },
        { emoji: "🚀", role: "Among Us", count: 21 },
      ],
    },
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
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Reaction Roles
        </h2>
      </div>

      <div className="bg-gray-800 rounded-md p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Create Reaction Role</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Role message name"
              className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Channel
            </label>
            <select className="bg-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option>Select channel</option>
              <option>#role-selection</option>
              <option>#welcome</option>
              <option>#general</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Message
            </label>
            <textarea
              className="bg-gray-700 rounded-md px-4 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter message content here..."
            ></textarea>
          </div>

          <div className="bg-gray-700 rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Reaction-Role Pairs
              </label>
              <button className="text-xs bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                Add Pair
              </button>
            </div>

            <div className="space-y-2 mt-3">
              <div className="flex items-center bg-gray-800 rounded p-3">
                <div className="flex-grow flex items-center">
                  <span className="text-xl mr-3">🎮</span>
                  <select className="bg-gray-700 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                    <option>Gamer</option>
                    <option>Minecraft</option>
                    <option>Valorant</option>
                  </select>
                </div>
                <button className="text-gray-400 hover:text-red-400">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center bg-gray-800 rounded p-3">
                <div className="flex-grow flex items-center">
                  <span className="text-xl mr-3">🎨</span>
                  <select className="bg-gray-700 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                    <option>Artist</option>
                    <option>Designer</option>
                    <option>Creative</option>
                  </select>
                </div>
                <button className="text-gray-400 hover:text-red-400">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="unique-roles"
              className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
            />
            <label htmlFor="unique-roles" className="ml-2 text-sm">
              Allow users to select only one role from this message
            </label>
          </div>

          <div className="flex justify-end">
            <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-md">
              Create Message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">
          Active Reaction Role Messages
        </h3>

        {roleMessages.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No reaction role messages have been set up.
          </p>
        ) : (
          <div className="space-y-4">
            {roleMessages.map((message) => (
              <div
                key={message.id}
                className="bg-gray-700 rounded-md overflow-hidden"
              >
                <div className="p-4 flex justify-between items-center bg-gray-750">
                  <div>
                    <h4 className="font-medium">{message.name}</h4>
                    <div className="text-sm text-gray-400">
                      {message.channel}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded hover:bg-gray-600 text-gray-300">
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 rounded hover:bg-gray-600 text-gray-300">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-600">
                  <div className="text-sm mb-3">{message.messageContent}</div>
                  <div className="flex flex-wrap gap-2">
                    {message.reactions.map((reaction, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800 rounded px-2 py-1 text-sm flex items-center"
                      >
                        <span className="mr-1">{reaction.emoji}</span>
                        <span className="mr-2">{reaction.role}</span>
                        <span className="text-xs text-gray-400">
                          ({reaction.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ReactionRolesComponent;
