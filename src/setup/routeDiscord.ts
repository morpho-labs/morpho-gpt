import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { createPineconeIndexIfNotExist, updatePineconeIndex } from "../utils";
import { PineconeClient } from "@pinecone-database/pinecone";

// Function to handle the setup command
export async function handleSetupCommand(
  pineconeClient: PineconeClient,
  pineconeTestIndex: string
): Promise<void> {
  // Return a new promise that is resolved when the setup is complete
  // Create a loader for documents in the `/documents` directory
  const loader = new DirectoryLoader("./documents", {
    // Load .txt and .md files using the TextLoader
    ".txt": (path: any) => new TextLoader(path),
    ".md": (path: any) => new TextLoader(path),
  });

  const docs = await loader.load();
  const VECTORDIMENSIONS = 1536;
  const TIMEOUT = 200000;

  // Create a Pinecone index with the specified name and vector dimensions
  await createPineconeIndexIfNotExist(
    pineconeClient,
    pineconeTestIndex,
    VECTORDIMENSIONS,
    TIMEOUT
  );

  // Update the Pinecone index with the loaded documents
  await updatePineconeIndex(pineconeClient, pineconeTestIndex, docs);

  // Log a success message
  console.log("Index created and data loaded into Pinecone successfully.");
}
