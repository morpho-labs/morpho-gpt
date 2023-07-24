#!/usr/bin/env node
const { program } = require("commander");
const {
  createPineconeIndexIfNotExist,
  updatePineconeIndex,
} = require("../dist/utils");
const PineconeClient = require("@pinecone-database/pinecone"); // Import your Pinecone client

program.version("0.0.1");

program
  .command("createIndex <indexName>")
  .description("create a new Pinecone index")
  .option("-d, --dimension <number>", "set the dimension of the vector", 300)
  .option("-t, --timeout <number>", "set the timeout duration", 180000)
  .option("-k, --key <string>", "Pinecone API key")
  .option("-e, --environment <string>", "Pinecone environment")
  .option("-i, --testindex <string>", "Pinecone test index")
  .action(async (indexName, options) => {
    const { key, environment, testindex, dimension, timeout } = options;
    const client = new PineconeClient({
      apiKey: key,
      environment: environment,
      defaultIndexName: testindex,
    });
    await createPineconeIndexIfNotExist(client, indexName, dimension, timeout);
  });

program
  .command("updateIndex <indexName> <path>")
  .description("Update a Pinecone index with new documents")
  .option("-k, --key <string>", "Pinecone API key")
  .option("-e, --environment <string>", "Pinecone environment")
  .option("-i, --testindex <string>", "Pinecone test index")
  .action(async (indexName, path, options) => {
    const { key, environment, testindex } = options;
    const client = new PineconeClient({
      apiKey: key,
      environment: environment,
      defaultIndexName: testindex,
    });
    const docs = readDocumentsFromFolder(path);
    await updatePineconeIndex(client, indexName, docs);
  });

program.parse(process.argv);
