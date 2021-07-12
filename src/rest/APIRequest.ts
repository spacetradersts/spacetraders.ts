import * as https from 'https';
import { Client } from '..';

if (https.Agent) var agent = new https.Agent({ keepAlive: true });

export class APIRequest {
    client: Client;
    path: string;
    params: string;
    fetchOptions: FetchOptions;

    constructor(options: RequestOptions) {
        this.client = options.client;
        this.path = options.path;
        this.fetchOptions = options.fetchOptions;
        if (options?.params) {
            let parameters = '?';
            for (const [key, value] of Object.entries(options.params)) {
                parameters += `${key}=${value}&`;
            }
            parameters = parameters.slice(0, parameters.length-1);
            this.params = parameters;
        }
    }
}

export interface RequestOptions {
    fetchOptions: FetchOptions,
    path: string,
    params?: object,
    client: Client
}

export interface FetchOptions {
    method: string,
    headers: {
        'Content-Type': string;
        Authorization?: string;
    },
    body?: string
}