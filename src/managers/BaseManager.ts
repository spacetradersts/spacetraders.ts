import { Client } from "..";


export class BaseManager {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }
}