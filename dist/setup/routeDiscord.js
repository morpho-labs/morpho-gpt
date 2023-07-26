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
const pinecone_1 = require("../services/pinecone");
/**
 * Handles the setup command for Pinecone.
 * Creates a Pinecone index with specified name and vector dimensions, if it doesn't exist already.
 * @param {PineconeClient} pineconeClient - The Pinecone client instance.
 * @param {string} pineconeTestIndex - The name of the Pinecone index.
 * @returns {Promise<void>}
 * @async
 */
function handleSetupCommand(pineconeClient, pineconeTestIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const VECTORDIMENSIONS = 1536;
        const TIMEOUT = 200000;
        // Create a Pinecone index with the specified name and vector dimensions
        yield (0, pinecone_1.createPineconeIndexIfNotExist)(pineconeClient, pineconeTestIndex, VECTORDIMENSIONS, TIMEOUT);
        console.log("Index created");
    });
}
exports.handleSetupCommand = handleSetupCommand;
