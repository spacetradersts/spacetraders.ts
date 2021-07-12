import { RawFlightPlan } from '../interfaces/APIPayload';
import { Client, Endpoints } from '..';
import { BaseGameComponent } from "./BaseGameComponent";

export class FlightPlan extends BaseGameComponent {
    arrivesAt: string;
    createdAt: string;
    departure: string;
    destination: string;
    distance: number;
    fuelConsumed: number;
    fuelRemaining: number;
    id: string;
    shipId: string;
    terminatedAt: string;
    timeRemainingInSeconds: number;

    constructor(client: Client, flightPlanData: RawFlightPlan) {
        super(client);

        this.arrivesAt = flightPlanData.arrivesAt;
        this.createdAt = flightPlanData.createdAt;
        this.departure = flightPlanData.departure;
        this.destination = flightPlanData.destination;
        this.distance = flightPlanData.distance;
        this.fuelConsumed = flightPlanData.fuelConsumed;
        this.fuelRemaining = flightPlanData.fuelRemaining;
        this.id = flightPlanData.id;
        this.shipId = flightPlanData.shipId;
        this.timeRemainingInSeconds = flightPlanData.timeRemainingInSeconds;
    }

    public toJSON() {
        const json = {} as RawFlightPlan;
        for (const [key, val] of Object.entries(this)) if (key == 'client') json[key] = val;
        return json;
    }
}