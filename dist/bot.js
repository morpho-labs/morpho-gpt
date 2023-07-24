"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = __importStar(require("discord.js"));
const routeDiscord_1 = require("./read/routeDiscord");
const routeDiscord_2 = require("./setup/routeDiscord");
const pinecone_1 = require("@pinecone-database/pinecone");
function startBot() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const discordApiKey = process.env.DISCORD_API_KEY;
        const openAiApiKey = process.env.OPENAI_API_KEY;
        const specificChannelId = process.env.SPECIFIC_CHANNEL_ID || "";
        const pineconeTestIndex = process.env.PINECONE_TEST_INDEX;
        const pineconeApiKey = (_a = process.env.PINECONE_API_KEY) !== null && _a !== void 0 ? _a : "";
        const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT || "";
        // Create a new Discord client with the necessary intents
        const discordClient = new discord_js_1.default.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildMessages,
            ],
        });
        // Create a new Pinecone client
        const pineconeClient = new pinecone_1.PineconeClient();
        // Initialize the Pinecone client with the API key and environment
        yield pineconeClient.init({
            apiKey: pineconeApiKey,
            environment: pineconeEnvironment || "",
        });
        //The following try-catch can be deleted for prod version of the code, as handling the setup part is defined thanks to the cli.
        try {
            // Handle the setup command that sets up the Pinecone Index
            yield (0, routeDiscord_2.handleSetupCommand)(pineconeClient, pineconeTestIndex, openAiApiKey);
        }
        catch (error) {
            console.error(`Failed to setup Pinecone Index: ${error}`);
        }
        // Store the timestamp of the last question asked
        let lastQuestionTime = 0;
        const questionCooldown = 30000;
        // Event listener for the "messageCreate" event
        discordClient.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(this, void 0, void 0, function* () {
            // Ignore messages from bots
            if (message.author.bot)
                return;
            if (message.channelId !== specificChannelId)
                return;
            // Respond to commands starting with "/question"
            if (message.content.startsWith("/question")) {
                try {
                    const currentTime = Date.now();
                    const timeDiff = currentTime - lastQuestionTime;
                    // If the cooldown period has not passed, inform the user to wait
                    if (timeDiff < questionCooldown) {
                        yield message.channel.send("Too many questions in a short time. Try again in " +
                            Math.ceil((questionCooldown - timeDiff) / 1000) +
                            " seconds.");
                        return;
                    }
                    const question = message.content.replace("/question", "").trim();
                    yield message.channel.send("Morpho GPT is thinking...\n" +
                        "\n*Reminder: I am still learning so my answers may be inaccurate.*");
                    // Handle the read command that retrieves the answer from the Pinecone Index and responds
                    yield (0, routeDiscord_1.handleReadCommand)(message, question, pineconeClient, pineconeTestIndex);
                    // Update the last question time
                    lastQuestionTime = currentTime;
                }
                catch (error) {
                    console.error(`Failed to send a reply: ${error}`);
                }
            }
        }));
        // Log in to Discord with your app's token
        discordClient.login(discordApiKey);
    });
}
// Start the bot aka main
startBot();
