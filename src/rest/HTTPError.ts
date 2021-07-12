/**
 * Represents a HTTP error from a request.
 * @extends Error
 */
export class HTTPError extends Error {
  public message: string;
  public name: string;
  public code: number;
  public method: string;

  constructor(message: string, name: string, code: number, method: string) {
    super(message);

    /**
     * The name of the error
     * @type {string}
     */
    this.name = name;

    /**
     * HTTP error code returned from the request
     * @type {number}
     */
    this.code = code || 500;

    /**
     * The HTTP method used for the request
     * @type {string}
     */
    this.method = method;
  }
}