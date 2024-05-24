import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { Pinecone } from "@pinecone-database/pinecone";
import { QueryResponse as PineconeQueryResponse } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/models/QueryResponse";
import {
  MyScoredVector,
  PineconeClientParams,
  QueryResponse,
  Vector,
} from "./interfaces";
import "dotenv/config";

/**
 * Creates a new Pinecone client and initializes it with the given parameters.
 * @param  params - The parameters to initialize the Pinecone client with.
 * @returns - The created and initialized Pinecone client.
 */
export const createPineconeClient = async (params: PineconeClientParams) => {
  const client = new Pinecone({ apiKey: params.apiKey });
  return client;
};

/**
 * Queries the Pinecone vector store with a given question, returning the store's response.
 * @param client - The Pinecone client to use for querying.
 * @param indexName - The name of the index to query.
 * @param question - The question to embed and query the vector store with.
 * @returns - The response from the Pinecone vector store.
 */
export const queryPineconeVectorStore = async (
  client: Pinecone,
  indexName: string,
  question: string
) => {
  console.log("Querying Pinecone vector store...");
  const index = client.Index(indexName);
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
  const pineconeResponse = await index.query({
    topK: 10,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true,
  });

  return pineconeResponse;
};

/**
 * Formats the response from a Pinecone query to match the QueryResponse interface.
 * @param pineconeResponse - The original response from the Pinecone query.
 * @returns - The formatted query response.
 */
export const formatPineconeResponse = (
  pineconeResponse: PineconeQueryResponse
) => {
  let queryResponse: QueryResponse = {
    matches: pineconeResponse.matches?.map((match) => {
      if (
        match.metadata &&
        "pageContent" in match.metadata &&
        "docLink" in match.metadata &&
        "docTitle" in match.metadata
      ) {
        const ret: MyScoredVector = {
          ...match,
          metadata: {
            pageContent: (match.metadata as any).pageContent,
            docLink: (match.metadata as any).docLink,
            docTitle: (match.metadata as any).docTitle,
          },
        };
        console.log("ret:", ret);
        return ret;
      } else {
        return match as MyScoredVector;
      }
    }),
    namespace: pineconeResponse.namespace,
  };

  return queryResponse;
};

/**
 * Queries a language model with the response from a Pinecone query and a question, returning the model's answer.
 * @param queryResponse - The formatted response from the Pinecone query.
 * @param question - The question to ask the language model.
 * @param openAIApiKey - The API key to use for the OpenAI language model.
 * @returns - The model's answer and the document links.
 */
export const queryLanguageModelWithPineconeResponse = async (
  queryResponse: QueryResponse,
  question: string,
  openAIApiKey: string
) => {
  console.log(`Asking question: ${question}...`);
  if (queryResponse?.matches?.length) {
    console.log(`Found ${queryResponse.matches.length} matches...`);
    const instructions =
      "You're an AI assistant. Based on the following excerpts from a long document, provide a conversational answer to the question asked. If the answer isn't in the context, simply respond with 'Hmm, I'm not sure. Albist will revert here soon.' Don't invent an answer. If the question isn't related to the context, state that you are programmed to answer questions relevant to the given context. Remember, you cannot use images or visual content to form your answer. Do the answer in less than 1800 characters. Also, never use the @ symbol in your response.";
    const preparedQuestion = `${instructions}\n\n${question}`;
    const llm = new OpenAI({ modelName: "gpt-4o", openAIApiKey });
    const chain = loadQAStuffChain(llm);
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata?.pageContent ?? "")
      .join(" ");
    const documentLinks = queryResponse.matches.map((match) => ({
      link: match.metadata?.docLink ?? "",
      title: match.metadata?.docTitle ?? "",
    }));
    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: preparedQuestion,
    });
    console.log(`Answer: ${result.text}`);
    return {
      answer: result.text,
      documentLinks: documentLinks,
    };
  } else {
    console.log("Since there are no matches, GPT-4o will not be queried.");
  }
};

/**
 * Creates a Pinecone index with a given name if it does not already exist.
 * @param client - The Pinecone client to use for index management.
 * @param indexName - The name of the index to create.
 * @param vectorDimension - The dimensionality of the vector for the index.
 * @param timeout - The timeout in milliseconds to wait for the index to initialize.
 */
export const createPineconeIndexIfNotExist = async (
  client: Pinecone,
  indexName: string,
  vectorDimension: number,
  timeout: number = 180000
) => {
  // Check if the index exists
  console.log(`Checking "${indexName}"...`);
  const existingIndexes = await client.listIndexes();
  console.log("existing indexes;", existingIndexes);

  // Check if indexes are defined and if indexName exists in the array
  if (
    existingIndexes.indexes &&
    !existingIndexes.indexes.map((index) => index.name).includes(indexName)
  ) {
    // 4. Log index creation initiation
    console.log(`Creating "${indexName}"...`);
    // 5. Create index
    await client.createIndex({
      name: indexName,
      dimension: vectorDimension,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-west-1" } },
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

/**
 * Process a single document and return the vectors to be upserted.
 * @param doc - The document to process.
 * @param openAIApiKey - The API key to use for the OpenAI language model.
 */
const processDocument = async (doc: Document, openAIApiKey: string) => {
  const txtPath = await doc.metadata.source;
  const text = doc.pageContent;
  const lines = text.split("\n");
  const documentLink = lines[0].match(/^Link: (.+)$/)?.[1] ?? "";
  const documentTitle = lines[1].match(/^Title: (.+)$/)?.[1] ?? "Untitled";
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const chunks = await textSplitter.createDocuments([text]);
  console.log(documentLink, documentTitle);
  const embeddingsArrays = await new OpenAIEmbeddings({
    openAIApiKey,
  }).embedDocuments(
    chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
  );

  return chunks.map(
    (chunk, idx) =>
      ({
        id: `${txtPath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath,
          docLink: documentLink,
          docTitle: documentTitle,
        },
      } as Vector)
  );
};

/**
 * Upserts batches of vectors to a Pinecone index.
 * @param index - The Pinecone index to update.
 * @param vectors - The vectors to upsert.
 */
const upsertVectors = async (index: any, vectors: Vector[]) => {
  const batchSize = 100;
  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await index.upsert(batch);
  }
};

/**
 * Updates a Pinecone index with new vectors created from the provided documents.
 * @param client - The Pinecone client to use for index management.
 * @param openAIApiKey - The API key to use for the OpenAI language model.
 * @param indexName - The name of the index to update.
 * @param docs - The documents to use for creating vectors.
 */
export const updatePineconeIndex = async (
  client: Pinecone,
  openAIApiKey: string,
  indexName: string,
  docs: Document[]
) => {
  const index = client.Index(indexName);

  for (const [i, doc] of docs.entries()) {
    const vectors = await processDocument(doc, openAIApiKey);
    await upsertVectors(index, vectors);
    console.log(
      `Processing document ${i + 1} of ${docs.length}, generated ${
        vectors.length
      } vectors`
    );
  }
};
