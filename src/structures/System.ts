import type { DockedShips, RawSystem, SystemLocations, SystemShipListing } from '../interfaces/APIPayload';
import { Collection } from '../util/Collection';
import { Client, Endpoints, FlightPlan } from '..';
import { BaseGameComponent } from "./BaseGameComponent";
import { Location } from "./Location";

export class System extends BaseGameComponent {
    name: string;
    symbol: string;

    constructor(client: Client, systemData: RawSystem) {
        super(client);
        this.name = systemData.name;
        this.symbol = systemData.symbol;
    }

    fetchShipListing() {
        return this.client.request('GET', Endpoints.SYSTEM_SHIPS(this.symbol), { auth: true }) as Promise<SystemShipListing>;
    }

    async fetchFlightPlans() {
        const response = await (this.client.request('GET', Endpoints.SYSTEM_FLIGHTPLANS(this.symbol), { auth: true }) as Promise<FlightPlan[]>);
        return response.map(flightPlan => new FlightPlan(this.client, flightPlan));
    }

    fetchDockedShips() {
        return this.client.request('GET', Endpoints.SYSTEM_DOCKED_SHIPS(this.symbol), { auth: true }) as Promise<DockedShips>;
    }

    async fetchLocations() {
        const response = await (this.client.request('GET', Endpoints.SYSTEM_LOCATIONS(this.symbol), { auth: true }) as Promise<SystemLocations>);
        return new Collection(response.locations.map(location => [location.symbol, new Location(this.client, location)]));
    }
}