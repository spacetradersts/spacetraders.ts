import fetch from "node-fetch";
import { APIRequest, AsyncQueue, Client, Endpoints } from "..";


export class RESTManager {
    client: Client;
    queue: AsyncQueue;

    constructor(client: Client) {
        this.client = client;
        this.queue = new AsyncQueue();
    }

    async push(request: APIRequest) {
        await this.queue.wait();
        try {
        return await this.execute(request);
        } finally {
        this.queue.shift();
        }
    }

    execute(request: APIRequest) {
        return new Promise((resolve, reject) => {
            fetch(Endpoints.BASE_URL + request.path + (request?.params ? request.params : ''), request.fetchOptions)
            .then((data)=>data.json())
            .then(resolve)
            .catch(reject)
        });
    }
}