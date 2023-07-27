import type { ScoredVector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/models/ScoredVector";
/**
 * Configuration options for a Pinecone client.
 * @interface
 */
export interface PineconeClientParams {
  /**
   * The API key used to authenticate with the Pinecone service.
   * @type {string}
   */
  apiKey: string;

  /**
   * The environment where the Pinecone service is running.
   * @type {string}
   */
  environment: string;
}

/**
 * A scored vector from Pinecone with custom metadata for the document's content and link.
 * @interface
 * @extends {ScoredVector}
 */
export interface MyScoredVector extends ScoredVector {
  /**
   * The document metadata.
   * @type {{
   *  pageContent: string;
   *  docLink: string;
   * } | undefined}
   */
  metadata?: {
    /**
     * The content of the document.
     * @type {string}
     */
    pageContent: string;

    /**
     * The link to the document.
     * @type {string}
     */
    docLink: string;
  };
}

/**
 * A vector in a Pinecone index.
 * @interface
 */
export interface Vector {
  /**
   * The unique ID of the vector.
   * @type {string}
   */
  id: string;

  /**
   * The values of the vector.
   * @type {number[]}
   */
  values: number[];

  /**
   * The metadata associated with the vector.
   * @type {{
   *  loc: string;
   *  pageContent: string;
   *  txtPath: string;
   *  docLink: string;
   * }}
   */
  metadata: {
    /**
     * The location of the vector.
     * @type {string}
     */
    loc: string;

    /**
     * The page content associated with the vector.
     * @type {string}
     */
    pageContent: string;

    /**
     * The path to the text file associated with the vector.
     * @type {string}
     */
    txtPath: string;

    /**
     * The link to the document associated with the vector.
     * @type {string}
     */
    docLink: string;
  };
}

/**
 * The response from a Pinecone query.
 * @interface
 */
export interface QueryResponse {
  /**
   * The matches for the vectors.
   * @type {Array<MyScoredVector>}
   */
  matches?: Array<MyScoredVector>;

  /**
   * The namespace for the vectors.
   * @type {string}
   */
  namespace?: string;
}
