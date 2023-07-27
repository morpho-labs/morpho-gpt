import "dotenv/config";
import Discord, { GatewayIntentBits, Events, Message } from "discord.js";
import { handleReadCommand } from "./read/routeDiscord";
import { handleSetupCommand } from "./setup/routeDiscord";
import { PineconeClient } from "@pinecone-database/pinecone";
import { createPineconeClient } from "./services/pinecone";

/**
 * A map to track each user's quota.
 * @type {Record<string, { count: number; resetAt: number }>}
 */
const userQuotaMap: Record<string, { count: number; resetAt: number }> = {};

/**
 * Checks whether a user has exceeded their quota.
 * @param {string} userId - The ID of the user to check.
 * @returns {boolean} - Returns true if the user is within their quota, false otherwise.
 */
function checkQuota(userId: string): boolean {
  const userQuota = userQuotaMap[userId];
  const currentTime = Date.now();
  const quotaPerMinute = 5;
  if (!userQuota || currentTime >= userQuota.resetAt) {
    userQuotaMap[userId] = { count: 1, resetAt: currentTime + 60000 };
    return true;
  }
  if (userQuota.count >= quotaPerMinute) {
    return false;
  }
  userQuota.count += 1;
  return true;
}

/**
 * Handles a message from a user.
 * @param {Message} message - The message from the user.
 * @param {PineconeClient} pineconeClient - The Pinecone client.
 * @param {string} pineconeTestIndex - The Pinecone test index.
 * @param {string} openAIApiKey - The OpenAI API key.
 */
async function handleMessage(
  message: Message,
  pineconeClient: PineconeClient,
  pineconeTestIndex: string,
  openAIApiKey: string
): Promise<void> {
  try {
    const question = message.content.replace("/question", "").trim();
    await message.channel.send(
      "Morpho GPT is thinking...\n" +
        "\n*Reminder: I am still learning so my answers may be inaccurate.*"
    );

    await handleReadCommand(
      message,
      question,
      pineconeClient,
      pineconeTestIndex,
      openAIApiKey
    );
  } catch (error) {
    console.error(`Failed to send a reply: ${error}`);
  }
}

/**
 * Starts the bot.
 */
async function startBot() {
  const discordApiKey = process.env.DISCORD_API_KEY;
  const openAIApiKey = process.env.OPENAI_API_KEY;
  const specificChannelId = process.env.SPECIFIC_CHANNEL_ID ?? "";
  const pineconeTestIndex = process.env.PINECONE_TEST_INDEX;
  const pineconeApiKey = process.env.PINECONE_API_KEY ?? "";
  const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT ?? "";

  const discordClient = new Discord.Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
    ],
  });

  const pineconeClient = createPineconeClient({
    apiKey: pineconeApiKey,
    environment: pineconeEnvironment,
  });
  console.log("Pinecone client created");
  try {
    await handleSetupCommand(await pineconeClient, pineconeTestIndex!);
  } catch (error) {
    console.error(`Failed to setup Pinecone Index: ${error}`);
  }

  discordClient.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.channelId !== specificChannelId) return;
    if (message.content.startsWith("/question")) {
      if (checkQuota(message.author.id)) {
        await handleMessage(
          message,
          await pineconeClient,
          pineconeTestIndex!,
          openAIApiKey!
        );
      } else {
        await message.channel.send(
          "You have reached the maximum number of 5 questions per minute. Please wait a moment before asking again."
        );
      }
    }
  });

  discordClient.login(discordApiKey);
}

startBot();
