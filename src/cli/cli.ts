#!/usr/bin/env node

import { program } from "commander";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  createPineconeClient,
  createPineconeIndexIfNotExist,
  updatePineconeIndex,
} from "../services/pinecone";
import { getOptionOrEnv, exitIfNull } from "../services/cli";

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
    const index = getOptionOrEnv(
      options,
      "index",
      "PINECONE_INDEX",
      "test-index"
    );

    const dimension = getOptionOrEnv(options, "dimension", "", 1536);

    const key = getOptionOrEnv(options, "key", "PINECONE_API_KEY", null);
    exitIfNull(key, "Missing Pinecone API key");

    const environment = getOptionOrEnv(
      options,
      "environment",
      "PINECONE_ENVIRONMENT",
      null
    );
    exitIfNull(environment, "Missing Pinecone Environment");

    const timeout = getOptionOrEnv(options, "timeout", "", 200000);

    const pineconeClient = await createPineconeClient({
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
    const index = getOptionOrEnv(
      options,
      "index",
      "PINECONE_INDEX",
      "test-index"
    );

    const key = getOptionOrEnv(options, "key", "PINECONE_API_KEY", null);
    exitIfNull(key, "Missing Pinecone API key");

    const environment = getOptionOrEnv(
      options,
      "environment",
      "PINECONE_ENVIRONMENT",
      null
    );
    exitIfNull(environment, "Missing Pinecone Environment");

    const openAIApiKey = getOptionOrEnv(
      options,
      "openAIApiKey",
      "OPENAI_API_KEY",
      null
    );
    exitIfNull(openAIApiKey, "Missing OPENAI API key");

    const pathDocs = getOptionOrEnv(options, "pathDocs", "", null);
    exitIfNull(pathDocs, "Missing path for the documentation");
    const pineconeClient = await createPineconeClient({
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
