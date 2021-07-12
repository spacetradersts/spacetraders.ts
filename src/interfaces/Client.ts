export interface ClientOptions {
    restTimeOffset?: number;
    restRequestTimeout?: number;
    retryLimit?: number;
}

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';