import "dotenv/config";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Message } from "discord.js";
import {
  queryPineconeVectorStore,
  formatPineconeResponse,
  queryLanguageModelWithPineconeResponse,
} from "../services/pinecone";

/**
 * Handles the read command.
 * Queries Pinecone vector store and OpenAI model to answer a question, then sends the response to a Discord channel.
 * @param message - The message instance from the Discord.js client.
 * @param question - The question to be answered.
 * @param pineconeClient - The Pinecone client instance.
 * @param pineconeTestIndex - The name of the Pinecone index.
 * @param openAIApiKey - The API key for the OpenAI model.
 */
export const handleReadCommand = async (
  message: Message,
  question: string,
  pineconeClient: PineconeClient,
  pineconeTestIndex: string,
  openAIApiKey: string
) => {
  try {
    // Query Pinecone vector store and retrieve answer and document links
    const pineconeResponse = await queryPineconeVectorStore(
      pineconeClient,
      pineconeTestIndex,
      question
    );
    const formattedResponse = formatPineconeResponse(pineconeResponse);
    const result = await queryLanguageModelWithPineconeResponse(
      formattedResponse,
      question,
      openAIApiKey
    );

    if (result) {
      // Select the top 3 most probable distinct links
      let distinctDocumentLinks: string[] = [
        ...new Set(result.documentLinks as string[]),
      ];
      let documentLinks: string[] = distinctDocumentLinks.slice(0, 3);

      // Prepare a string that contains all the document links
      let linksString = documentLinks
        .map((link, index) => `**Link ${index + 1}:** <${link}>`)
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
