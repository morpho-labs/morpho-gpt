import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { PineconeClient } from "@pinecone-database/pinecone";

// Function to query the Pinecone vector store and Query Language Model
export const queryPineconeVectorStoreAndQueryLLM = async (
  client: PineconeClient,
  indexName: string,
  question: string
) => {
  // Starting the query process
  console.log("Querying Pinecone vector store...");
  // Retrieve the specific Pinecone index
  const index = client.Index(indexName);
  // Create an embedding of the question to query
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
  // Query the Pinecone index and return top 10 matches
  let queryResponse = await index.query({
    queryRequest: {
      topK: 10,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });
  // Log the question being asked
  console.log(`Asking question: ${question}...`);
  if (queryResponse && queryResponse.matches && queryResponse.matches.length) {
    // Log the number of matches found
    console.log(`Found ${queryResponse.matches.length} matches...`);

    // Create an OpenAI instance and load the QAStuffChain
    const instructions =
      "You're an AI assistant. Based on the following excerpts from a long document, provide a conversational answer to the question asked. If the answer isn't in the context, simply respond with 'Hmm, I'm not sure.' Don't invent an answer. If the question isn't related to the context, state that you are programmed to answer questions relevant to the given context. Remember, you cannot use images or visual content to form your answer. Do the answer in less than 2000 caracters.";
    const preparedQuestion = `${instructions}\n\n${question}`;
    const llm = new OpenAI({ modelName: "gpt-3.5-turbo-16k" });
    const chain = loadQAStuffChain(llm);
    // Extract the page content from the matched documents and concatenate
    const concatenatedPageContent = queryResponse.matches
      .map((match: any) => match.metadata.pageContent)
      .join(" ");
    const documentLinks = queryResponse.matches.map(
      (match: any) => match.metadata.docLink
    );
    // Execute the chain with input documents and question
    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: preparedQuestion,
    });
    // Log the answer generated by GPT-3
    console.log(`Answer: ${result.text}`);
    // Return the answer and the links to the source documents
    return {
      answer: result.text,
      documentLinks: documentLinks,
    };
  } else {
    // If no matches were found, inform the user that GPT-3 won't be queried
    console.log("Since there are no matches, GPT-3.5 will not be queried.");
  }
};
export const createPineconeIndexIfNotExist = async (
  client: PineconeClient,
  indexName: string,
  vectorDimension: number,
  timeout: number = 180000
) => {
  // Check if the index exists
  console.log(`Checking "${indexName}"...`);
  const existingIndexes = await client.listIndexes();
  // If index does not exist, create it
  if (!existingIndexes.includes(indexName)) {
    // 4. Log index creation initiation
    console.log(`Creating "${indexName}"...`);
    // 5. Create index
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      },
    });
    // 6. Log successful creation
    console.log(
      `Creating index.... please wait for it to finish initializing.`
    );
    // Wait for XXX seconds to let the index initialize
    await new Promise((resolve) => setTimeout(resolve, timeout));
  } else {
    // If the index exists, log that it already exists
    console.log(`"${indexName}" already exists.`);
  }
};
// Function to update Pinecone Index with new vectors
export const updatePineconeIndex = async (
  client: PineconeClient,
  openAiApiKey: string,
  indexName: string,
  docs: Document<Record<string, any>>[]
) => {
  console.log("Retrieving Pinecone index...");
  // Retrieve the specific Pinecone index
  const index = client.Index(indexName);
  console.log(`Pinecone index retrieved: ${indexName}`);

  // Process each document in the docs array
  for (const doc of docs) {
    console.log(`Processing document: ${doc.metadata.source}`);
    const txtPath = await doc.metadata.source;
    const text = doc.pageContent;

    const documentLinkMatch = text.match(/Link: (.+)/);
    const documentLink = documentLinkMatch ? documentLinkMatch[1] : "";

    // Create an instance of RecursiveCharacterTextSplitter
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    console.log("Splitting text into chunks...");
    // Split text into chunks (documents)
    const chunks = await textSplitter.createDocuments([text]);
    console.log(`Text split into ${chunks.length} chunks`);
    console.log(
      `Calling OpenAI's Embedding endpoint documents with ${chunks.length} text chunks ...`
    );
    // Create embeddings for the documents
    const embeddingsArrays = await new OpenAIEmbeddings({
      openAIApiKey: openAiApiKey,
    }).embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
    );
    console.log("Finished embedding documents");
    console.log(
      `Creating ${chunks.length} vectors array with id, values, and metadata...`
    );
    // Create and upsert vectors in batches of 100
    const batchSize = 100;
    let batch: any = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];
      const vector = {
        id: `${txtPath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath,
          docLink: documentLink,
        },
      };
      batch = [...batch, vector];
      // When batch is full or it's the last item, upsert the vectors
      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert({
          upsertRequest: {
            vectors: batch,
          },
        });
        // Empty the batch
        batch = [];
      }
    }
    // Log the number of vectors updated
    console.log(`Pinecone index updated with ${chunks.length} vectors`);
  }
};
