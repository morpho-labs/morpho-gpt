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
const utils_1 = require("../utils");
// Function to handle the read command
function handleReadCommand(message, question, pineconeClient, pineconeTestIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Query Pinecone vector store and retrieve answer and document links
            const result = yield (0, utils_1.queryPineconeVectorStoreAndQueryLLM)(pineconeClient, pineconeTestIndex, question);
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
