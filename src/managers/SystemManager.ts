import { FetchedSystem } from '../interfaces/APIPayload';
import { SystemFetchOptions } from '../interfaces/Options';
import Collection from '../util/Collection';
import { Client, Endpoints, System } from '..';
import { BaseManager } from './BaseManager';

export class SystemManager extends BaseManager {
    cache: Collection<string, System>;

    constructor(client: Client) {
        super(client);
        this.cache = new Collection<string, System>();
    }

    public fetch(options: SystemFetchOptions) {
        if (this.cache.has(options.systemSymbol) && !options?.force) return Promise.resolve(this.cache.get(options.systemSymbol));
        return (this.client.request('GET', Endpoints.SYSTEM(options.systemSymbol), { auth: true }) as Promise<FetchedSystem>)
        .then((data) => {
            const system = new System(this.client, data.system);
            if (options.cache || !('cache' in options)) this.cache.set(data.system.symbol, system);
            return system;
        });
    }
}