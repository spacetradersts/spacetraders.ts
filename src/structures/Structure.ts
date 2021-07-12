import { RawStructure, StructureDeposit, StructureWithdrawal } from '../interfaces/APIPayload';
import { Client, Endpoints } from '..';
import { BaseGameComponent } from "./BaseGameComponent";
import { PartialCargo } from './PartialCargo';

export class Structure extends BaseGameComponent {
    active: boolean;
    consumes: string[];
    id: string;
    inventory: PartialCargo[];
    location: string;
    ownedBy: {
        username: string;
    };
    produces: string[];
    status: string;
    type: string;

    constructor(client: Client, structureData: RawStructure) {
        super(client);
        this.active = structureData.active;
        this.consumes = structureData.consumes;
        this.id = structureData.id;
        this.inventory = structureData.inventory.map(partialCargo => new PartialCargo(client, partialCargo));
        this.location = structureData.location;
        this.ownedBy = structureData.ownedBy;
        this.produces = structureData.produces;
        this.status = structureData.status;
        this.type = structureData.type;
    }

    async deposit(shipId: string, good: string, quantity: number) {
        const ship = await this.client.ships.fetch({ shipId });
        const depositData = await this.client.request('POST', Endpoints.STRUCTURE_DEPOSIT(this.id), { auth: true, body: { shipId, good, quantity } }) as StructureDeposit;
        ship.update(depositData.ship);
        this.update(depositData.structure);
    }

    async withdraw(shipId: string, good: string, quantity: number) {
        const ship = await this.client.ships.fetch({ shipId });
        const withdrawData = await this.client.request('POST', Endpoints.STRUCTURE_WITHDRAW(this.id), { auth: true, body: { shipId, good, quantity } }) as StructureWithdrawal;
        ship.update(withdrawData.ship);
        this.update(withdrawData.structure);
    }

    update(data: RawStructure) {
        this.active = data.active;
        this.consumes = data.consumes;
        this.inventory = data.inventory.map(partialCargo => new PartialCargo(this.client, partialCargo));
        this.location = data.location;
        this.ownedBy = data.ownedBy;
        this.produces = data.produces;
        this.status = data.status;
        this.type = data.type;
    }
}