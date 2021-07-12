import { FetchedStructures, FetchedStructure } from '../interfaces/APIPayload';
import { StructureFetchOptions } from '../interfaces/Options';
import Collection from '../util/Collection';
import { Client, Endpoints } from '..';
import { Structure } from '../structures/Structure';
import { BaseManager } from './BaseManager';

export class StructureManager extends BaseManager {
    cache: Collection<string, Structure>;

    constructor(client: Client) {
        super(client);
        this.cache = new Collection<string, Structure>();
    }

    public create(location: string, type: string) {
        return (this.client.request('POST', Endpoints.STRUCTURES, { auth: true, params: { location, type } }) as Promise<FetchedStructure>)
        .then(data => {
            const structure = new Structure(this.client, data.structure);
            this.cache.set(data.structure.id, structure);
            return structure;
        });
    }

    public fetch({ structureId, cache, force }: {
        structureId: string,
        cache?: boolean,
        force?: boolean
    }): Promise<Structure>;
    public fetch(): Promise<Collection<string, Structure>>;
    public fetch(options?: StructureFetchOptions) {
        if (this.cache.has(options?.structureId) && !options?.force) return Promise.resolve(this.cache.get(options?.structureId));
        return (this.client.request('GET', options?.structureId ? Endpoints.STRUCTURE(options?.structureId) : Endpoints.STRUCTURES, { auth: true }) as Promise<FetchedStructures | FetchedStructure>)
        .then((data) => {
            const structures = new Collection<string, Structure>();
            if ('structures' in data) for (const item of data.structures) {
                const structure = new Structure(this.client, item);
                if (options.cache || !('cache' in options)) this.cache.set(item.id, structure);
                structures.set(item.id, structure);
            } else if ('structure' in data) {
                const structure = new Structure(this.client, data.structure);
                if (options.cache || !('cache' in options)) this.cache.set(data.structure.id, structure);
                structures.set(data.structure.id, structure);
            }
            if (structures.size == 1 && !!options?.structureId) return structures.first();
            return structures;
        });
    }
}