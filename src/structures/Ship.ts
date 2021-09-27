import type { FlightPlansPayload, OrdersPayload, RawShip } from '../interfaces/APIPayload';
import Collection from '../util/Collection';
import { Client, Endpoints, FlightPlan } from '..';
import { BaseGameComponent } from "./BaseGameComponent";
import { Cargo } from './Cargo';

export class Ship extends BaseGameComponent {
    cargo: Collection<string, Cargo>;
    flightPlanId: string;
    id: string;
    locationSymbol: string;
    spaceAvailable: number;
    x: number;
    y: number;

    constructor(client: Client, shipData: RawShip) {
        super(client);

        this.cargo = new Collection(shipData.cargo.map(c => [c.good, new Cargo(this.client, c)]));
        this.flightPlanId = shipData.flightPlanId;
        this.id = shipData.id;
        this.locationSymbol = shipData.location;
        this.spaceAvailable = shipData.spaceAvailable;
        this.x = shipData.x;
        this.y = shipData.y;
    }

    fetchFlightPlan() {
        return this.client.flightPlans.fetch({ flightPlanId: this.flightPlanId });
    }

    fetchLocation() {
        return this.client.locations.fetch({ locationSymbol: this.locationSymbol });
    }

    async purchaseGoods(good: string, quantity: number) {
        const data = await (this.client.request('POST', Endpoints.PURCHASE_ORDERS, { auth: true, params: { shipId: this.id, good, quantity } }) as Promise<OrdersPayload>);
        this.client.credits = data.credits;
        this.spaceAvailable = data.ship.spaceAvailable;
        const tempCargo = new Collection(data.ship.cargo.map(c => [c.good, new Cargo(this.client, c)]));
        this.cargo.set(good, new Cargo(this.client, tempCargo.get(data.order.good)));
        return this;
    }

    async sellGoods(good: string, quantity: number) {
        const data = await (this.client.request('POST', Endpoints.PURCHASE_ORDERS, { auth: true, params: { shipId: this.id, good, quantity } }) as Promise<OrdersPayload>);
        this.client.credits = data.credits;
        this.spaceAvailable = data.ship.spaceAvailable;
        const tempCargo = new Collection(data.ship.cargo.map(c => [c.good, new Cargo(this.client, c)]));
        if (tempCargo.has(good))
            this.cargo.set(good, new Cargo(this.client, tempCargo.get(data.order.good)));
        else
            this.cargo.delete(good);
        return this;
    }

    
    async warp() {
        const data = await (this.client.request('POST', Endpoints.WARP_JUMP, { auth: true, params: { shipId: this.id } }) as Promise<FlightPlansPayload>);
        const flightPlan = new FlightPlan(this.client, data.flightPlan);
        this.client.flightPlans.cache.set(flightPlan.id, flightPlan);
        return flightPlan;
    }

    update(data: RawShip) {
        this.cargo = new Collection(data.cargo.map(c => [c.good, new Cargo(this.client, c)]));
        this.flightPlanId = data?.flightPlanId ? data.flightPlanId : this.flightPlanId;
        this.spaceAvailable = data.spaceAvailable;
        this.locationSymbol = data.location;
        this.x = data.x;
        this.y = data.y;
    }
}