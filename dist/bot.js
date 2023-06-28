"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const discord_js_1 = __importDefault(require("discord.js"));
const routeDiscord_1 = require("./read/routeDiscord");
const routeDiscord_2 = require("./setup/routeDiscord");
const { GatewayIntentBits, Events, TextChannel } = require("discord.js");
function startBot() {
    return __awaiter(this, void 0, void 0, function* () {
        const discordApiKey = process.env.DISCORD_API_KEY;
        const specificChannelId = process.env.SPECIFIC_CHANNEL_ID || "";
        const client = new discord_js_1.default.Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
            ],
        });
        try {
            yield (0, routeDiscord_2.handleSetupCommand)(client);
        }
        catch (error) {
            console.error(`Failed to setup Pinecone Index: ${error}`);
        }
        client.on(Events.MessageCreate, (message) => __awaiter(this, void 0, void 0, function* () {
            // Ignore messages from bots
            if (message.author.bot)
                return;
            // Respond to the command "/whoAreYou"
            if (message.content.toLowerCase() === "/whoareyou") {
                try {
                    const channel = client.channels.cache.get(specificChannelId);
                    const textChannel = channel;
                    // await textChannel.send("Hello, I'm ready!");
                    yield message.channel.send("I belong to Morpho DAO, I am Morpho#8845");
                }
                catch (error) {
                    console.error(`Failed to send a reply: ${error}`);
                }
            }
        }));
        let lastQuestionTime = 0; // store the timestamp of the last question
        const questionCooldown = 60000; // 120 seconds cooldown
        client.on(Events.MessageCreate, (message) => __awaiter(this, void 0, void 0, function* () {
            // Ignore messages from bots
            if (message.author.bot)
                return;
            if (message.content.startsWith("/question")) {
                try {
                    const currentTime = Date.now();
                    const timeDiff = currentTime - lastQuestionTime;
                    if (timeDiff < questionCooldown) {
                        yield message.channel.send("Too many questions in a short time. Try again in " +
                            Math.ceil((questionCooldown - timeDiff) / 1000) +
                            " seconds.");
                        return;
                    }
                    const question = message.content.replace("/question", "").trim();
                    yield message.channel.send("You asked: 👇🏼\n\n" +
                        "*" +
                        question +
                        "*" +
                        "\n\n We are currently computing an answer, wait a sec..." +
                        "\n\n 🚨 Please note that we are restricting those queries to 1 per minute, and that the bot may be innacurate.\n");
                    yield (0, routeDiscord_1.handleReadCommand)(client, message, question);
                    lastQuestionTime = currentTime; // update the last question time
                }
                catch (error) {
                    console.error(`Failed to send a reply: ${error}`);
                }
            }
        }));
        client.login(discordApiKey);
    });
}
startBot();
