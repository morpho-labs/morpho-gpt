#!/usr/bin/env node

import { program } from "commander";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  createPineconeClient,
  createPineconeIndexIfNotExist,
  updatePineconeIndex,
} from "../services/pinecone";

program.version("0.0.1");

/**
 * Command to create a new Pinecone index.
 */
program
  .command("create-index")
  .description("create a new Pinecone index")
  .option("-i, --index <string>", "Name of the Pinecone Index")
  .option("-d, --dimension <number>", "set the dimension of the vector")
  .option("-k, --key <string>", "Pinecone API key")
  .option("-e, --environment <string>", "Pinecone environment")
  .option("-t, --timeout <number>", "set the timeout duration")
  .action(async (options: any) => {
    const index =
      "index" in options &&
      typeof options.indexName === "string" &&
      options.index !== ""
        ? options.index
        : process.env.PINECONE_TEST_INDEX ?? "test-index"; //value by default

    const dimension =
      "dimension" in options &&
      typeof options.dimension === "number" &&
      options.dimension !== ""
        ? options.dimension
        : 1536; //value by default

    const key =
      "key" in options && typeof options.key === "string" && options.key !== ""
        ? options.key ?? process.env.PINECONE_API_KEY
        : null;

    if (!key) {
      console.error("Missing Pinecone API key");
      process.exit(1);
    }
    const environment =
      "environment" in options &&
      typeof options.environment === "string" &&
      options.environment !== ""
        ? options.environment ?? process.env.PINECONE_ENVIRONMENT
        : null;

    if (!environment) {
      console.error("Missing Pinecone Environment");
      process.exit(1);
    }

    const timeout =
      "timeout" in options &&
      typeof options.timeout === "number" &&
      options.timeout !== ""
        ? options.timeout
        : 200000; //value by default

    const pineconeClient = createPineconeClient({
      apiKey: key,
      environment: environment,
    });

    await createPineconeIndexIfNotExist(
      pineconeClient,
      index,
      dimension,
      timeout
    );
  });

/**
 * Command to update a Pinecone index with new documents.
 */
program
  .command("update-index")
  .description("Update a Pinecone index with new documents")
  .option("-i, --index <string>", "Name of the Pinecone Index")
  .option("-k, --key <string>", "Pinecone API key")
  .option("-e, --environment <string>", "Pinecone environment")
  .option("-a, --openAIApiKey <string>", "OPENAI API key")
  .option("-p, --pathDocs <string>", "Path of the documentation")
  .action(async (options: any) => {
    const index =
      "index" in options &&
      typeof options.indexName === "string" &&
      options.index !== ""
        ? options.index
        : process.env.PINECONE_TEST_INDEX ?? "test-index"; //value by default

    const key =
      "key" in options && typeof options.key === "string" && options.key !== ""
        ? options.key ?? process.env.PINECONE_API_KEY
        : null;

    if (!key) {
      console.error("Missing Pinecone API key");
      process.exit(1);
    }
    const environment =
      "environment" in options &&
      typeof options.environment === "string" &&
      options.environment !== ""
        ? options.environment ?? process.env.PINECONE_ENVIRONMENT
        : null;

    if (!environment) {
      console.error("Missing Pinecone Environment");
      process.exit(1);
    }
    const openAIApiKey =
      "openAIApiKey" in options &&
      typeof options.openAIApiKeyy === "string" &&
      options.openAIApiKey !== ""
        ? options.openAIApiKey ?? process.env.OPENAI_API_KEY
        : null;

    if (!openAIApiKey) {
      console.error("Missing OPENAI API key");
      process.exit(1);
    }
    const pathDocs =
      "pathDocs" in options &&
      typeof options.pathDocs === "string" &&
      options.pathDocs !== ""
        ? options.pathDocs
        : null;

    if (!pathDocs) {
      console.error("Missing path for the documentation");
      process.exit(1);
    }

    const pineconeClient = createPineconeClient({
      apiKey: key,
      environment: environment,
    });
    const loader = new DirectoryLoader(pathDocs, {
      ".txt": (path: string) => new TextLoader(path),
      ".md": (path: string) => new TextLoader(path),
    });

    const docs = await loader.load();
    await updatePineconeIndex(pineconeClient, openAIApiKey, index, docs);
  });

program.parse(process.argv);
