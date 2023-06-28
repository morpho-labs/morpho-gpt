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
exports.handleReadCommand = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const utils_1 = require("../utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const indexNamePinecone = process.env.PINECONE_TEST_INDEX;
function handleReadCommand(client, message, question) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the question from the command arguments
        //const question = args.join(" ");
        // Initialize the Pinecone client
        const pineconeClient = new pinecone_1.PineconeClient();
        yield pineconeClient.init({
            apiKey: process.env.PINECONE_API_KEY || "",
            environment: process.env.PINECONE_ENVIRONMENT || "",
        });
        try {
            // Query Pinecone vector store and retrieve answer and document links
            const result = yield (0, utils_1.queryPineconeVectorStoreAndQueryLLM)(pineconeClient, indexNamePinecone, question);
            if (result) {
                // Select the top 3 most probable distinct links
                let distinctDocumentLinks = [
                    ...new Set(result.documentLinks),
                ];
                let documentLinks = distinctDocumentLinks.slice(0, 3);
                // let documentLinks = result.documentLinks.slice(0, 3);
                // Prepare a string that contains all the document links
                let linksString = documentLinks
                    .map((link, index) => `**Link ${index + 1}:** ${link}`)
                    .join("\n");
                // Send the answer and document links as a message to the Discord channel
                message.channel.send(`\n**Answer:**\n ${result.answer}\n**Document Links (most probable):**\n${linksString}`);
            }
            else {
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
