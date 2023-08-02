import { PineconeClient } from "@pinecone-database/pinecone";

/**
 * Handles the setup command for Pinecone.
 * Checks if a Pinecone index with the specified name exists.
 * Throws an error if it doesn't exist.
 * @param pineconeClient - The Pinecone client instance.
 * @param pineconeTestIndex - The name of the Pinecone index.
 * @async
 */
export const handleSetupCommand = async (
  pineconeClient: PineconeClient,
  pineconeTestIndex: string
) => {
  // Check if the index exists and throw an error if it doesn't
  const existingIndexes = await pineconeClient.listIndexes();

  if (!existingIndexes.includes(pineconeTestIndex)) {
    throw new Error(`Pinecone index ${pineconeTestIndex} does not exist.`);
  }

  console.log("Index exists");
}
