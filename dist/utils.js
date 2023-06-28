"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePinecone = exports.createPineconeIndex = exports.queryPineconeVectorStoreAndQueryLLM = void 0;
const openai_1 = require("langchain/embeddings/openai");
const text_splitter_1 = require("langchain/text_splitter");
const openai_2 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const document_1 = require("langchain/document");
const timeout = 180000;
const queryPineconeVectorStoreAndQueryLLM = (client, indexName, question) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Start query process
    console.log("Querying Pinecone vector store...");
    // 2. Retrieve the Pinecone index
    const index = client.Index(indexName);
    // 3. Create query embedding
    const queryEmbedding = yield new openai_1.OpenAIEmbeddings().embedQuery(question);
    // 4. Query Pinecone index and return top 10 matches
    let queryResponse = yield index.query({
        queryRequest: {
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
        },
    });
    // 5. Log the number of matches
    console.log(`Found ${queryResponse.matches.length} matches...`);
    // 6. Log the question being asked
    console.log(`Asking question: ${question}...`);
    if (queryResponse.matches.length) {
        // 7. Create an OpenAI instance and load the QAStuffChain
        const llm = new openai_2.OpenAI({});
        const chain = (0, chains_1.loadQAStuffChain)(llm);
        // 8. Extract and concatenate page content from matched documents
        const concatenatedPageContent = queryResponse.matches
            .map((match) => match.metadata.pageContent)
            .join(" ");
        const documentLinks = queryResponse.matches.map((match) => match.metadata.docLink);
        // 9. Execute the chain with input documents and question
        const result = yield chain.call({
            input_documents: [new document_1.Document({ pageContent: concatenatedPageContent })],
            question: question,
        });
        // 10. Log the answer
        console.log(`Answer: ${result.text}`);
        return {
            answer: result.text,
            documentLinks: documentLinks, // Include the document links in the response
        };
    }
    else {
        // 11. Log that there are no matches, so GPT-3 will not be queried
        console.log("Since there are no matches, GPT-3 will not be queried.");
    }
});
exports.queryPineconeVectorStoreAndQueryLLM = queryPineconeVectorStoreAndQueryLLM;
const createPineconeIndex = (client, indexName, vectorDimension) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Initiate index existence check
    console.log(`Checking "${indexName}"...`);
    // 2. Get list of existing indexes
    const existingIndexes = yield client.listIndexes();
    // 3. If index doesn't exist, create it
    if (!existingIndexes.includes(indexName)) {
        // 4. Log index creation initiation
        console.log(`Creating "${indexName}"...`);
        // 5. Create index
        yield client.createIndex({
            createRequest: {
                name: indexName,
                dimension: vectorDimension,
                metric: "cosine",
            },
        });
        // 6. Log successful creation
        console.log(`Creating index.... please wait for it to finish initializing.`);
        // 7. Wait 60 seconds for index initialization
        yield new Promise((resolve) => setTimeout(resolve, timeout));
    }
    else {
        // 8. Log if index already exists
        console.log(`"${indexName}" already exists.`);
    }
});
exports.createPineconeIndex = createPineconeIndex;
const updatePinecone = (client, indexName, docs) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Retrieving Pinecone index...");
    // 1. Retrieve Pinecone index
    const index = client.Index(indexName);
    // 2. Log the retrieved index name
    console.log(`Pinecone index retrieved: ${indexName}`);
    // 3. Process each document in the docs array
    for (const doc of docs) {
        console.log(`Processing document: ${doc.metadata.source}`);
        const txtPath = doc.metadata.source;
        const text = doc.pageContent;
        const documentLinkMatch = text.match(/Link: (.+)/);
        const documentLink = documentLinkMatch ? documentLinkMatch[1] : "";
        // 4. Create RecursiveCharacterTextSplitter instance
        const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 1000,
        });
        console.log("Splitting text into chunks...");
        // 5. Split text into chunks (documents)
        const chunks = yield textSplitter.createDocuments([text]);
        console.log(`Text split into ${chunks.length} chunks`);
        console.log(`Calling OpenAI's Embedding endpoint documents with ${chunks.length} text chunks ...`);
        // 6. Create OpenAI embeddings for documents
        const embeddingsArrays = yield new openai_1.OpenAIEmbeddings().embedDocuments(chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " ")));
        console.log("Finished embedding documents");
        console.log(`Creating ${chunks.length} vectors array with id, values, and metadata...`);
        // 7. Create and upsert vectors in batches of 100
        const batchSize = 100;
        let batch = [];
        for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            const vector = {
                id: `${txtPath}_${idx}`,
                values: embeddingsArrays[idx],
                metadata: Object.assign(Object.assign({}, chunk.metadata), { loc: JSON.stringify(chunk.metadata.loc), pageContent: chunk.pageContent, txtPath: txtPath, docLink: documentLink }),
            };
            batch = [...batch, vector];
            // When batch is full or it's the last item, upsert the vectors
            if (batch.length === batchSize || idx === chunks.length - 1) {
                yield index.upsert({
                    upsertRequest: {
                        vectors: batch,
                    },
                });
                // Empty the batch
                batch = [];
            }
        }
        // 8. Log the number of vectors updated
        console.log(`Pinecone index updated with ${chunks.length} vectors`);
    }
});
exports.updatePinecone = updatePinecone;
