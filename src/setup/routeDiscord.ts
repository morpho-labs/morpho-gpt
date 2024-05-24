import { Pinecone } from "@pinecone-database/pinecone";

/**
 * Handles the setup command for Pinecone.
 * Checks if a Pinecone index with the specified name exists.
 * Throws an error if it doesn't exist.
 * @param pineconeClient - The Pinecone client instance.
 * @param pineconeTestIndex - The name of the Pinecone index.
 * @async
 */
export const handleSetupCommand = async (
  pineconeClient: Pinecone,
  pineconeTestIndex: string
) => {
  // Check if the index exists and throw an error if it doesn't
  const existingIndexes = await pineconeClient.listIndexes();
  console.log("existing indexes;", existingIndexes);

  // Check if indexes are defined and if pineconeTestIndex exists in the array
  if (
    existingIndexes.indexes &&
    existingIndexes.indexes
      .map((index) => index.name)
      .includes(pineconeTestIndex)
  ) {
    console.log("Index exists");
  } else {
    throw new Error(`Pinecone index ${pineconeTestIndex} does not exist.`);
  }
};
