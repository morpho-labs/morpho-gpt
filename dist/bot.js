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
const pinecone_1 = require("./services/pinecone");
/**
 * A map to track each user's quota.
 * @type {Record<string, { count: number; resetAt: number }>}
 */
const userQuotaMap = {};
/**
 * Checks whether a user has exceeded their quota.
 * @param {string} userId - The ID of the user to check.
 * @returns {boolean} - Returns true if the user is within their quota, false otherwise.
 */
function checkQuota(userId) {
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
function handleMessage(message, pineconeClient, pineconeTestIndex, openAIApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const question = message.content.replace("/question", "").trim();
            yield message.channel.send("Morpho GPT is thinking...\n" +
                "\n*Reminder: I am still learning so my answers may be inaccurate.*");
            yield (0, routeDiscord_1.handleReadCommand)(message, question, pineconeClient, pineconeTestIndex, openAIApiKey);
        }
        catch (error) {
            console.error(`Failed to send a reply: ${error}`);
        }
    });
}
/**
 * Starts the bot.
 */
function startBot() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const discordApiKey = process.env.DISCORD_API_KEY;
        const openAIApiKey = process.env.OPENAI_API_KEY;
        const specificChannelId = process.env.SPECIFIC_CHANNEL_ID || "";
        const pineconeTestIndex = process.env.PINECONE_TEST_INDEX;
        const pineconeApiKey = (_a = process.env.PINECONE_API_KEY) !== null && _a !== void 0 ? _a : "";
        const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT || "";
        const discordClient = new discord_js_1.default.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildMessages,
            ],
        });
        const pineconeClient = (0, pinecone_1.createPineconeClient)({
            apiKey: pineconeApiKey,
            environment: pineconeEnvironment,
        });
        try {
            yield (0, routeDiscord_2.handleSetupCommand)(pineconeClient, pineconeTestIndex);
        }
        catch (error) {
            console.error(`Failed to setup Pinecone Index: ${error}`);
        }
        discordClient.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot)
                return;
            if (message.channelId !== specificChannelId)
                return;
            if (message.content.startsWith("/question")) {
                if (checkQuota(message.author.id)) {
                    yield handleMessage(message, pineconeClient, pineconeTestIndex, openAIApiKey);
                }
                else {
                    yield message.channel.send("You have reached the maximum number of 5 questions per minute. Please wait a moment before asking again.");
                }
            }
        }));
        discordClient.login(discordApiKey);
    });
}
startBot();
