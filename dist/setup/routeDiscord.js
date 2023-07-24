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
exports.handleSetupCommand = void 0;
const text_1 = require("langchain/document_loaders/fs/text");
const directory_1 = require("langchain/document_loaders/fs/directory");
const utils_1 = require("../utils");
// Function to handle the setup command
function handleSetupCommand(pineconeClient, pineconeTestIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Return a new promise that is resolved when the setup is complete
        // Create a loader for documents in the `/documents` directory
        const loader = new directory_1.DirectoryLoader("./documents", {
            // Load .txt and .md files using the TextLoader
            ".txt": (path) => new text_1.TextLoader(path),
            ".md": (path) => new text_1.TextLoader(path),
        });
        const docs = yield loader.load();
        const VECTORDIMENSIONS = 1536;
        const TIMEOUT = 200000;
        // Create a Pinecone index with the specified name and vector dimensions
        yield (0, utils_1.createPineconeIndexIfNotExist)(pineconeClient, pineconeTestIndex, VECTORDIMENSIONS, TIMEOUT);
        // Update the Pinecone index with the loaded documents
        yield (0, utils_1.updatePineconeIndex)(pineconeClient, pineconeTestIndex, docs);
        // Log a success message
        console.log("Index created and data loaded into Pinecone successfully.");
    });
}
exports.handleSetupCommand = handleSetupCommand;
