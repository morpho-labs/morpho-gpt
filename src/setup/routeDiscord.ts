import { PineconeClient } from "@pinecone-database/pinecone";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { createPineconeIndex, updatePinecone } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

const indexNamePinecone = process.env.PINECONE_TEST_INDEX;

// Function to handle the setup command
export function handleSetupCommand(client: any): Promise<void> {
  // Return a new promise that is resolved when the setup is complete
  return new Promise(async (resolve, reject) => {
    // Create a loader for documents in the `/documents` directory
    const loader = new DirectoryLoader("./documents", {
      // Load .txt and .md files using the TextLoader
      ".txt": (path: any) => new TextLoader(path),
      ".md": (path: any) => new TextLoader(path),
    });

    const docs = await loader.load();
    const vectorDimensions = 1536;

    // Create a new Pinecone client
    const pineconeClient = new PineconeClient();
    // Initialize the Pinecone client with the API key and environment
    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY || "",
      environment: process.env.PINECONE_ENVIRONMENT || "",
    });

    try {
      // Create a Pinecone index with the specified name and vector dimensions
      await createPineconeIndex(
        pineconeClient,
        indexNamePinecone,
        vectorDimensions
      );

      // Update the Pinecone index with the loaded documents
      await updatePinecone(pineconeClient, indexNamePinecone, docs);

      // Log a success message
      console.log("Index created and data loaded into Pinecone successfully.");

      // Resolve the promise if everything is successful
      resolve();
    } catch (error) {
      // If there's an error, reject the promise and pass the error along
      reject(error);
    }
  });
}
