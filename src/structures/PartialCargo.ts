import { RawPartialCargo } from "src/interfaces/APIPayload";
import { BaseGameComponent } from "./BaseGameComponent";
import { Client } from "./Client";

export class PartialCargo extends BaseGameComponent {
    good: string;
    quantity: number;

    constructor(client: Client, cargoData: RawPartialCargo) {
        super(client);
        this.good = cargoData.good;
        this.quantity = cargoData.quantity;
    }
}