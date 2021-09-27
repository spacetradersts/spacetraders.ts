import type { RawCargo } from "../interfaces/APIPayload";
import type { Client } from "./Client";
import { PartialCargo } from "./PartialCargo";

export class Cargo extends PartialCargo {
    totalVolume: number;

    constructor(client: Client, cargoData: RawCargo) {
        super(client, { good: cargoData.good, quantity: cargoData.quantity });
        this.totalVolume = cargoData.totalVolume;
    }
}