import { FetchedLocation } from '../interfaces/APIPayload';
import { LocationManagerFetchOptions } from '../interfaces/Options';
import Collection from '../util/Collection';
import { Client, Endpoints, Location } from '..';
import { BaseManager } from './BaseManager';

export class LocationManager extends BaseManager {
    cache: Collection<string, Location>;

    constructor(client: Client) {
        super(client);
        this.cache = new Collection<string, Location>();
    }

    public fetch(options: LocationManagerFetchOptions) {
        if (this.cache.has(options.locationSymbol) && !options?.force) return Promise.resolve(this.cache.get(options.locationSymbol));
        return (this.client.request('GET', Endpoints.LOCATION(options.locationSymbol), { auth: true }) as Promise<FetchedLocation>)
        .then((data) => {
            const location = new Location(this.client, data.location);
            if (options.cache || !('cache' in options)) this.cache.set(data.location.symbol, location);
            return location;
        });
    }
}