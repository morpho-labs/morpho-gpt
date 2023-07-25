import "dotenv/config";
import Discord, { GatewayIntentBits, Events } from "discord.js";
import { handleReadCommand } from "./read/routeDiscord";
import { handleSetupCommand } from "./setup/routeDiscord";
import { PineconeClient } from "@pinecone-database/pinecone";

async function startBot() {
  const discordApiKey = process.env.DISCORD_API_KEY;
  const openAiApiKey = process.env.OPENAI_API_KEY;
  const specificChannelId = process.env.SPECIFIC_CHANNEL_ID || "";
  const pineconeTestIndex = process.env.PINECONE_TEST_INDEX;
  const pineconeApiKey = process.env.PINECONE_API_KEY ?? "";
  const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT || "";
  // Create a new Discord client with the necessary intents
  const discordClient = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
    ],
  });
  // Create a new Pinecone client
  const pineconeClient = new PineconeClient();
  // Initialize the Pinecone client with the API key and environment
  await pineconeClient.init({
    apiKey: pineconeApiKey,
    environment: pineconeEnvironment || "",
  });

  //The following try-catch can be deleted for prod version of the code, as handling the setup part is defined thanks to the cli.
  try {
    // Handle the setup command that sets up the Pinecone Index
    await handleSetupCommand(pineconeClient, pineconeTestIndex!, openAiApiKey!);
  } catch (error) {
    console.error(`Failed to setup Pinecone Index: ${error}`);
  }
  // Store the timestamp of the last question asked
  let lastQuestionTime = 0;
  const questionCooldown = 30000;

  // Event listener for the "messageCreate" event
  discordClient.on(Events.MessageCreate, async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;
    if (message.channelId !== specificChannelId) return;
    // Respond to commands starting with "/question"
    if (message.content.startsWith("/question")) {
      try {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastQuestionTime;
        // If the cooldown period has not passed, inform the user to wait
        if (timeDiff < questionCooldown) {
          await message.channel.send(
            "Too many questions in a short time. Try again in " +
              Math.ceil((questionCooldown - timeDiff) / 1000) +
              " seconds."
          );
          return;
        }

        const question = message.content.replace("/question", "").trim();
        await message.channel.send(
          "Morpho GPT is thinking...\n" +
            "\n*Reminder: I am still learning so my answers may be inaccurate.*"
        );
        // Handle the read command that retrieves the answer from the Pinecone Index and responds
        await handleReadCommand(
          message,
          question,
          pineconeClient,
          pineconeTestIndex!
        );
        // Update the last question time
        lastQuestionTime = currentTime;
      } catch (error) {
        console.error(`Failed to send a reply: ${error}`);
      }
    }
  });
  // Log in to Discord with your app's token
  discordClient.login(discordApiKey);
}
// Start the bot aka main
startBot();
