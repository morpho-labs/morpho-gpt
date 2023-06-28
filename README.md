# Discord Bot

## Description

This Discord bot was built to answer questions posed by users in a specific Discord channel. It uses [OpenAI's GPT-3](https://openai.com/research/gpt-3), [Pinecone](https://www.pinecone.io/), and [Langchain](https://langchain.io/) to process and answer questions. The bot embeds user questions, queries a Pinecone vector store for the most relevant documents, and then uses GPT-3 to generate an answer from those documents.

The bot relies on a repository of .txt and .md files that contain the knowledge base used to answer questions. Each of these files start with a link and a title in the two first lines of the document.
For example:
file.md
line 1: Link: https://example.documentation
line 2: Title: Example Documentation
line 3: ...

These two lines are used for display purposes in Discord. The bot uses the text from these documents, along with the provided link, to construct responses to user queries.

## Project Structure

The project is divided into four main TypeScript files:

- `bot.ts`: Initializes the Discord bot and handles command interactions.
- `utils.ts`: Contains utility functions for querying and updating the Pinecone vector store.
- `setup/routeDiscord.ts`: Handles the setup of the Pinecone Index, loading documents from a specific directory.
- `read/routeDiscord.ts`: Handles the read commands from the Discord chat.

## Setup

### Prerequisites

To run this project, you need the following:

- Node.js and npm installed on your local environment
- Discord API Key
- Pinecone API Key
- GPT-3 API Key

### Installation

1. Clone the repository to your local machine.
2. Install the project dependencies using npm:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory of the project and populate it with your API keys:

   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   PINECONE_TEST_INDEX=your_pinecone_index
   DISCORD_API_KEY=your_discord_key
   SPECIFIC_CHANNEL_ID=your_specific_channel

4. Start the bot:

   ```bash
   npm run start
   ```

## Usage

You can ask the bot a question in any Discord channel where it's present by typing /question Your question here. For example:

/question What is the Documentation about?

The bot will then compute an answer and respond in the channel. The bot's response includes a relevant chunk of text from the queried documents and a link to the source document. Please note that we are restricting queries to 1 per minute.

## Docker Deployment

5. Build the Docker image:

```bash
   docker build -t my-discord-bot .
```

6. Run the Docker container:

```bash
docker run -d -p 8080:8080 --env-file ./.env my-discord-bot
```

## Documentation

All documentation to build the bot's knowledge base should be in .txt or .md files. The two first lines in each document must start with "Link" and "Title" for display purposes on Discord. This format allows the bot to include the source link and title in its responses.

## Contributing

Contributions are welcome! Please read our Contributing Guide for more information.

## License
