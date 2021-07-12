import { FlightPlansPayload } from '../interfaces/APIPayload';
import { FlightPlanFetchOptions } from '../interfaces/Options';
import Collection from '../util/Collection';
import { Client, Endpoints, FlightPlan } from '..';
import { BaseManager } from './BaseManager';

export class FlightPlanManager extends BaseManager {
    cache: Collection<string, FlightPlan>;

    constructor(client: Client) {
        super(client);
        this.cache = new Collection<string, FlightPlan>();
    }

    public create(shipId: string, destination: string) {
        return (this.client.request('POST', Endpoints.FLIGHT_PLANS, { auth: true, params: { shipId, destination } }) as Promise<FlightPlansPayload>)
        .then((data) => {
            const flightPlan = new FlightPlan(this.client, data.flightPlan);
            this.cache.set(data.flightPlan.id, flightPlan);
            return flightPlan;
        });
    }

    public fetch(options: FlightPlanFetchOptions) {
        if (this.cache.has(options.flightPlanId) && !options?.force) return Promise.resolve(this.cache.get(options.flightPlanId));
        return (this.client.request('GET', Endpoints.FLIGHT_PLAN(options.flightPlanId), { auth: true }) as Promise<FlightPlansPayload>)
        .then((data) => {
            const flightPlan = new FlightPlan(this.client, data.flightPlan);
            if (options.cache || !('cache' in options)) this.cache.set(data.flightPlan.id, flightPlan);
            return flightPlan;
        });
    }
}