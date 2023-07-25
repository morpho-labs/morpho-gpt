#!/usr/bin/env node
const { program } = require("commander");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const {
  createPineconeIndexIfNotExist,
  updatePineconeIndex,
} = require("../dist/utils");
const { PineconeClient } = require("@pinecone-database/pinecone");

program.version("0.0.1");

program
  .command("createIndex <indexName> <dimension> <key> <environment>")
  .description("create a new Pinecone index")
  // If one prefers to let options below and not put args
  // .option("-i, --indexName <string>", "Name of the Pinecone Index")
  // .option("-d, --dimension <number>", "set the dimension of the vector", 1536)
  // .option("-k, --key <string>", "Pinecone API key")
  // .option("-e, --environment <string>", "Pinecone environment")
  .option("-t, --timeout <number>", "set the timeout duration", 200000)
  .action(async (indexName, dimension, key, environment, options) => {
    const { timeout } = options;
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
  .command("updateIndex <indexName> <key> <environment> <openAiApiKey>")
  .description("Update a Pinecone index with new documents")
  // If one prefers to let options below and not put args
  // .option("-i, --indexName <string>", "Name of the Pinecone Index")
  // .option("-k, --key <string>", "Pinecone API key")
  // .option("-e, --environment <string>", "Pinecone environment")
  // .option("-a, --openAiApiKey <string>", "OPENAI API key")
  .option("-p, --pathDocs <string>", "Path of the documentation")
  .action(async (indexName, key, environment, openAiApiKey, options) => {
    const { pathDocs } = options;
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
