# Discord Bot

![What is Morpho?](https://cdn.morpho.org/images/morpho-gpt/what-is-morpho.png)

## Description

This Discord bot was built to answer questions posed by users in a specific Discord channel. It uses [OpenAI's GPT-3.5](https://platform.openai.com/docs/api-reference), [Pinecone](https://www.pinecone.io/), and [Langchain](https://langchain.io/) to process and answer questions. The bot embeds user questions, queries a Pinecone vector store for the most relevant documents, and then uses GPT-3.5 to generate an answer from those documents.

The bot relies on a repository of .txt and .md files that contain the knowledge base used to answer questions. Each of these files start with a link and a title in the two first lines of the document.
For example:
file.md
line 1: Link: https://example.documentation
line 2: Title: Example Documentation
line 3: ...

These two lines are used for display purposes in Discord. The bot uses the text from these documents, along with the provided link, to construct responses to user queries.

## Project Structure

The core of the project is divided into four main TypeScript files in the `./src` folder.:

- `bot.ts`: Initializes the Discord bot and handles command interactions.
- `utils.ts`: Contains utility functions for querying and updating the Pinecone vector store.
- `setup/routeDiscord.ts`: Handles the setup of the Pinecone Index by creating an index if it does not exist.
- `read/routeDiscord.ts`: Handles the read commands from the Discord chat.
- `cli/cli.ts`: Handles the cli commands to monitor thanks to the workflow action.
- `services/interfaces.ts`: Handling the interfaces.
- `services/pinecone.ts`: Handling pinecone related functions.

## Setup

### Prerequisites

To run this project, you need the following:

- Node.js and npm installed on your local environment
- Discord API Key
- Pinecone API Key
- GPT-3.5 API Key

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

Contributions are welcome!

## Legal Notice

This repository is not endorsed by or affiliated with the providers of the APIs or resources contained within. This project is designed for educational purposes and is purely a personal endeavor. Websites or resource providers may contact me to enhance their security, or to request the removal of their site or API from this repository.

Please acknowledge the following:

- Disclaimer: All APIs, services, and trademarks mentioned in this repository are the property of their respective owners. This project does not assert any rights over them and is not affiliated with, or endorsed by, any of the mentioned providers.

- Responsibility: The creator of this repository is not liable for any implications, damages, or losses that occur due to the use or misuse of this repository or the content supplied by the third-party APIs. Users bear the sole responsibility for their actions and any consequences thereof. It is strongly suggested that users adhere to the Terms of Service of each website or API used.

- Educational Purposes Only: This repository and its content are strictly for educational use. By employing the information and code provided, users acknowledge they are utilizing the APIs and models at their own peril and pledge to comply with all relevant laws and regulations.

- Copyright: Unless stated otherwise, all content in this repository, including but not limited to code, images, and documentation, is the intellectual property of the repository author. Unauthorized reproduction, distribution, or utilization of any content in this repository is strictly prohibited without the explicit written permission of the repository author.

- Indemnification: Users agree to indemnify, defend, and hold the author of this repository harmless from and against all claims, liabilities, damages, losses, or expenses, including attorney fees and costs, arising out of or in any way connected with their use or misuse of this repository, its content, or associated third-party APIs.

- Updates and Changes: The author retains the right to alter, update, or remove any content, information, or features in this repository at any time without advance notice. Users are accountable for regularly reviewing the content and any modifications made to this repository.

By utilizing this repository or any related code, you agree to these terms. The author is not responsible for any copies, forks, or reuploads produced by other users. This is the sole account and repository of the author. To avoid impersonation or irresponsible behavior, adherence to the GNU GPL license that this Repository utilizes is advised.
