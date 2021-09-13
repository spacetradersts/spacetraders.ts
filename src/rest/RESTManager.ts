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

    async execute(request: APIRequest) {
        return fetch(Endpoints.BASE_URL + request.path + (request?.params ? request.params : ''), request.fetchOptions)
            .then((data)=>data.json())
            .catch(e=>console.log(e))
    }
}

const _importDynamic = new Function('modulePath', 'return import(modulePath)')

async function fetch(...args) {
    const {default: fetch} = await _importDynamic('node-fetch');
    return fetch(...args);
}