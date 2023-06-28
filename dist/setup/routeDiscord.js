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
exports.handleSetupCommand = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const text_1 = require("langchain/document_loaders/fs/text");
const directory_1 = require("langchain/document_loaders/fs/directory");
const utils_1 = require("../utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const indexNamePinecone = process.env.PINECONE_TEST_INDEX;
function handleSetupCommand(client) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // Load documents from the `/documents` directory
        const loader = new directory_1.DirectoryLoader("./documents", {
            ".txt": (path) => new text_1.TextLoader(path),
            ".md": (path) => new text_1.TextLoader(path),
        });
        const docs = yield loader.load();
        const vectorDimensions = 1536;
        // Initialize the Pinecone client
        const pineconeClient = new pinecone_1.PineconeClient();
        yield pineconeClient.init({
            apiKey: process.env.PINECONE_API_KEY || "",
            environment: process.env.PINECONE_ENVIRONMENT || "",
        });
        try {
            // Create Pinecone index
            yield (0, utils_1.createPineconeIndex)(pineconeClient, indexNamePinecone, vectorDimensions);
            // Update Pinecone index with the loaded documents
            yield (0, utils_1.updatePinecone)(pineconeClient, indexNamePinecone, docs);
            // Send a success message to the Discord channel
            console.log("Index created and data loaded into Pinecone successfully.");
            // Resolve the promise if everything is successful
            resolve();
        }
        catch (error) {
            // Reject the promise with the error
            reject(error);
        }
    }));
}
exports.handleSetupCommand = handleSetupCommand;
