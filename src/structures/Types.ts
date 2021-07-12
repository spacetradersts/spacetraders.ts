import { Client, Endpoints } from '..';
import { BaseGameComponent } from './BaseGameComponent';

export class Types extends BaseGameComponent {

    constructor(client: Client) {
        super(client);
    }

    fetchAvailableGoods() {
        return this.client.request('GET', Endpoints.AVAILABLE_GOODS, { auth: true });
    }

    fetchAvailableLoans() {
        return this.client.request('GET', Endpoints.AVAILABLE_LOANS, { auth: true });
    }

    fetchAvailableStructures() {
        return this.client.request('GET', Endpoints.AVAILABLE_STRUCTURES, { auth: true });
    }

    fetchAvailableShips() {
        return this.client.request('GET', Endpoints.AVAILABLE_SHIPS, { auth: true });
    }
}