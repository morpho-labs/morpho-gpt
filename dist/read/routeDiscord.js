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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReadCommand = void 0;
require("dotenv/config");
const pinecone_1 = require("../services/pinecone");
/**
 * Handles the read command.
 * Queries Pinecone vector store and OpenAI model to answer a question, then sends the response to a Discord channel.
 * @param {Message} message - The message instance from the Discord.js client.
 * @param {string} question - The question to be answered.
 * @param {PineconeClient} pineconeClient - The Pinecone client instance.
 * @param {string} pineconeTestIndex - The name of the Pinecone index.
 * @param {string} openAIApiKey - The API key for the OpenAI model.
 * @async
 */
function handleReadCommand(message, question, pineconeClient, pineconeTestIndex, openAIApiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Query Pinecone vector store and retrieve answer and document links
            const pineconeResponse = yield (0, pinecone_1.queryPineconeVectorStore)(pineconeClient, pineconeTestIndex, question);
            const formattedResponse = (0, pinecone_1.formatPineconeResponse)(pineconeResponse);
            const result = yield (0, pinecone_1.queryLanguageModelWithPineconeResponse)(formattedResponse, question, openAIApiKey);
            if (result) {
                // Select the top 3 most probable distinct links
                let distinctDocumentLinks = [
                    ...new Set(result.documentLinks),
                ];
                let documentLinks = distinctDocumentLinks.slice(0, 3);
                // Prepare a string that contains all the document links
                let linksString = documentLinks
                    .map((link, index) => `**Link ${index + 1}:** <${link}>`)
                    .join("\n");
                // Send the answer and document links as a message to the Discord channel
                message.channel.send(`\n**Answer:**\n ${result.answer}\n**Useful resources:**\n${linksString}`);
            }
            else {
                // Send a message to the Discord channel if no results were found
                message.channel.send("No results found for your query.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            // Send an error message to the Discord channel if an error occurs
            message.channel.send("An error occurred while processing your request.");
        }
    });
}
exports.handleReadCommand = handleReadCommand;
