import { createPineconeIndexIfNotExist } from "../services/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";

/**
 * Handles the setup command for Pinecone.
 * Creates a Pinecone index with specified name and vector dimensions, if it doesn't exist already.
 * @param {PineconeClient} pineconeClient - The Pinecone client instance.
 * @param {string} pineconeTestIndex - The name of the Pinecone index.
 * @returns {Promise<void>}
 * @async
 */
export async function handleSetupCommand(
  pineconeClient: PineconeClient,
  pineconeTestIndex: string
): Promise<void> {
  const VECTORDIMENSIONS = 1536;
  const TIMEOUT = 200000;

  // Create a Pinecone index with the specified name and vector dimensions
  await createPineconeIndexIfNotExist(
    pineconeClient,
    pineconeTestIndex,
    VECTORDIMENSIONS,
    TIMEOUT
  );
  console.log("Index created");
}
