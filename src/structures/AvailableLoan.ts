import type { LoanType, RawAvailableLoan } from "../interfaces/APIPayload";
import { BaseGameComponent } from "./BaseGameComponent";
import type { Client } from "./Client";


export class AvailableLoan extends BaseGameComponent {
    amount: number;
    collateralRequired: boolean;
    rate: number;
    termInDays: number;
    type: LoanType;

    constructor(client: Client, availableLoanData: RawAvailableLoan) {
        super(client);
        this.amount = availableLoanData.amount;
        this.collateralRequired = availableLoanData.collateralRequired;
        this.rate = availableLoanData.rate;
        this.termInDays = availableLoanData.termInDays;
        this.type = availableLoanData.type;
    }
}