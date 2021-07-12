import { FetchedShips, FetchedShip, PurchasedShip, ScrappedShip } from '../interfaces/APIPayload';
import { ShipFetchOptions } from '../interfaces/Options';
import Collection from '../util/Collection';
import { Client, Endpoints } from '..';
import { Ship } from '../structures/Ship';
import { BaseManager } from './BaseManager';

export class ShipManager extends BaseManager {
    public cache: Collection<string, Ship>;

    constructor(client: Client) {
        super(client);
        this.cache = new Collection<string, Ship>();
    }

    public create(location: string, type: string) {
        return (this.client.request('POST', Endpoints.SHIPS, { auth: true, params: { location, type } }) as Promise<PurchasedShip>)
        .then(data => {
            const ship = new Ship(this.client, data.ship);
            this.cache.set(data.ship.id, ship);
            return ship;
        });
    }

    public delete(shipId: string) {
        return (this.client.request('DELETE', Endpoints.SHIP(shipId), { auth: true }) as Promise<ScrappedShip>)
        .then(data => {
            this.cache.delete(shipId);
            const credits = Number(data.success.replace(/\D/g, ''));
            return credits;
        });
    }

    public fetch({ shipId, cache, force }: {
        shipId: string,
        cache?: boolean,
        force?: boolean
    }): Promise<Ship>;
    public fetch(): Promise<Collection<string, Ship>>;
    public async fetch(options?: ShipFetchOptions) {
        if (this.cache.has(options?.shipId) && !options?.force) return this.cache.get(options?.shipId);
        const data = await (this.client.request('GET', options?.shipId ? Endpoints.SHIP(options?.shipId) : Endpoints.SHIPS, { auth: true }) as Promise<FetchedShips | FetchedShip>);
        const ships = new Collection<string, Ship>();
        if ('ships' in data)
            for (const item of data.ships) {
                const ship = new Ship(this.client, item);
                if (options.cache || !('cache' in options))
                    this.cache.set(item.id, ship);
                ships.set(item.id, ship);
            } else if ('ship' in data) {
                const ship = new Ship(this.client, data.ship);
                if (options.cache || !('cache' in options))
                    this.cache.set(data.ship.id, ship);
                ships.set(data.ship.id, ship);
            }
        if (ships.size == 1 && options?.shipId)
            return ships.first();
        return ships;
    }
}