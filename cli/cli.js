#!/usr/bin/env node
const { program } = require("commander");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const {
  createPineconeIndexIfNotExist,
  updatePineconeIndex,
} = require("../dist/utils");
const { PineconeClient } = require("@pinecone-database/pinecone"); // Import your Pinecone client

program.version("0.0.1");

program
  .command("createIndex")
  .description("create a new Pinecone index")
  .option("-i, --indexName <string>", "Name of the Pinecone Index")
  .option("-d, --dimension <number>", "set the dimension of the vector", 1536)
  .option("-t, --timeout <number>", "set the timeout duration", 200000)
  .option("-k, --key <string>", "Pinecone API key")
  .option("-e, --environment <string>", "Pinecone environment")
  .action(async (options) => {
    const { indexName, key, environment, dimension, timeout } = options;
    const pineconeClient = new PineconeClient({});
    await pineconeClient.init({
      apiKey: key,
      environment: environment,
    });
    await createPineconeIndexIfNotExist(
      pineconeClient,
      indexName,
      dimension,
      timeout
    );
  });

program
  .command("updateIndex")
  .description("Update a Pinecone index with new documents")
  .option("-i, --indexName <string>", "Name of the Pinecone Index")
  .option("-k, --key <string>", "Pinecone API key")
  .option("-e, --environment <string>", "Pinecone environment")
  .option("-p, --pathDocs <string>", "Path of the documentation")
  .option("-a, --openAiApiKey <string>", "OPENAI API key")
  .action(async (options) => {
    const { indexName, key, environment, pathDocs, openAiApiKey } = options;
    const pineconeClient = new PineconeClient({});
    await pineconeClient.init({
      apiKey: key,
      environment: environment,
    });
    const loader = new DirectoryLoader(pathDocs, {
      // Load .txt and .md files using the TextLoader
      ".txt": (path) => new TextLoader(path),
      ".md": (path) => new TextLoader(path),
    });

    const docs = await loader.load();
    await updatePineconeIndex(pineconeClient, openAiApiKey, indexName, docs);
  });

program.parse(process.argv);
