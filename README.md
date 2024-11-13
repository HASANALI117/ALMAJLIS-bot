# ALMAJLIS Discord Bot

This is a simple Discord bot created for our gaming server. The bot performs scheduled tasks and responds to specific messages.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/)
- A Discord bot token. You can create a bot and get a token from the [Discord Developer Portal](https://discord.com/developers/applications).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/discord-bot.git
   cd discord-bot
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   TOKEN=your-discord-bot-token
   ```

### Running the Bot

To start the bot, run the following command:

```sh
node index.js
```

## Usage

- The bot will log "Bot is online." when it is successfully started.
- At 1:30 AM every day, the bot will check if Husain is online and send a message to the "general" channel if he is.
- At 4:45 AM every day, the bot will send a message to the "general" channel mentioning 3 members to be online.
- If a user sends "hi" in any channel, the bot will respond with "SHUTUP".

## Built With

- [discord.js](https://discord.js.org/) - A powerful JavaScript library for interacting with the Discord API.
- [node-cron](https://www.npmjs.com/package/node-cron) - A task scheduler for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv) - A module to load environment variables from a `.env` file.
