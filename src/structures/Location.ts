import type { DockedShip, LocationsPayload, MarketplaceItem, RawLocation } from '../interfaces/APIPayload';
import type { LocationFetchOptions } from '../interfaces/Options';
import { Collection } from '../util/Collection';
import { Client, Endpoints } from '..';
import { BaseGameComponent } from "./BaseGameComponent";

export class Location extends BaseGameComponent {
    allowsConstruction: boolean;
    name: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
    marketplace: Collection<string, MarketplaceItem>;
    dockedShips: Collection<string, DockedShip>;

    constructor(client: Client, locationData: RawLocation) {
        super(client);

        this.allowsConstruction = locationData.allowsConstruction;
        this.name = locationData.name;
        this.symbol = locationData.symbol;
        this.type = locationData.type;
        this.x = locationData.x;
        this.y = locationData.y;
        this.marketplace = new Collection<string, MarketplaceItem>();
        this.dockedShips = new Collection<string, DockedShip>();
    } 

    public fetch(options: { ships: boolean }): Promise<Collection<string, DockedShip>>;
    public fetch(options: { marketplace: boolean }): Promise<Collection<string, MarketplaceItem>>;
    public async fetch(options: LocationFetchOptions) {
        let locationEndpoint: string;
        if (options.marketplace) locationEndpoint = Endpoints.LOCATION_MARKETPLACE(this.symbol);
        else if (options.ships) locationEndpoint = Endpoints.LOCATION_SHIPS(this.symbol);
        else throw new Error(`an option wasn't properly provided for Location's fetch method`);
        const data = await (this.client.request('GET', locationEndpoint, { auth: true }) as Promise<LocationsPayload>);
        if ('ships' in data)
            return this.dockedShips = new Collection<string, DockedShip>(data.ships.map(ship => [ship.shipId, ship]));
        if ('marketplace' in data)
            return this.marketplace = new Collection<string, MarketplaceItem>(data.marketplace.map(item => [item.symbol, item]));
        throw new Error(`something didn't fetch properly for the location object: ${data}`);
    }
}