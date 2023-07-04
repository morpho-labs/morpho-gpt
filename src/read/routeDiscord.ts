import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "../utils";
import * as dotenv from "dotenv";
dotenv.config();

const indexNamePinecone = process.env.PINECONE_TEST_INDEX;
// Function to handle the read command
export async function handleReadCommand(
  client: any,
  message: any,
  question: string
) {
  // Initialize the Pinecone client
  const pineconeClient = new PineconeClient();
  await pineconeClient.init({
    apiKey: process.env.PINECONE_API_KEY || "",
    environment: process.env.PINECONE_ENVIRONMENT || "",
  });

  try {
    // Query Pinecone vector store and retrieve answer and document links
    const result = await queryPineconeVectorStoreAndQueryLLM(
      pineconeClient,
      indexNamePinecone,
      question
    );

    if (result) {
      // Select the top 3 most probable distinct links
      let distinctDocumentLinks: string[] = [
        ...new Set(result.documentLinks as string[]),
      ];
      let documentLinks: string[] = distinctDocumentLinks.slice(0, 3);

      // Prepare a string that contains all the document links
      let linksString = documentLinks
        .map(
          (link: string, index: number) => `**Link ${index + 1}:** <${link}>`
        )
        .join("\n");

      // Send the answer and document links as a message to the Discord channel
      message.channel.send(
        `\n**Answer:**\n ${result.answer}\n**Useful resources:**\n${linksString}`
      );
    } else {
      // Send a message to the Discord channel if no results were found
      message.channel.send("No results found for your query.");
    }
  } catch (error) {
    console.error("Error:", error);
    // Send an error message to the Discord channel if an error occurs
    message.channel.send("An error occurred while processing your request.");
  }
}
