import type { ScoredVector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/models/ScoredVector";
/**
 * Configuration options for a Pinecone client.
 * @interface
 */
export interface PineconeClientParams {
  /**
   * The API key used to authenticate with the Pinecone service.
   */
  apiKey: string;

  /**
   * The environment where the Pinecone service is running.
   */
  environment: string;
}

/**
 * A scored vector from Pinecone with custom metadata for the document's content and link.
 */
export interface MyScoredVector extends ScoredVector {
  /**
   * The document metadata.
   */
  metadata?: {
    /**
     * The content of the document.
     */
    pageContent: string;

    /**
     * The link to the document.
     */
    docLink: string;
  };
}

/**
 * A vector in a Pinecone index.
 */
export interface Vector {
  /**
   * The unique ID of the vector.
   */
  id: string;

  /**
   * The values of the vector.
   */
  values: number[];

  /**
   * The metadata associated with the vector.
   */
  metadata: {
    /**
     * The location of the vector.
     */
    loc: string;

    /**
     * The page content associated with the vector.
     */
    pageContent: string;

    /**
     * The path to the text file associated with the vector.
     */
    txtPath: string;

    /**
     * The link to the document associated with the vector.
     */
    docLink: string;
  };
}

/**
 * The response from a Pinecone query.
 */
export interface QueryResponse {
  /**
   * The matches for the vectors.
   */
  matches?: Array<MyScoredVector>;

  /**
   * The namespace for the vectors.
   */
  namespace?: string;
}
