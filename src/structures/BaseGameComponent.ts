import { Client } from "./Client";

export class BaseGameComponent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }
}