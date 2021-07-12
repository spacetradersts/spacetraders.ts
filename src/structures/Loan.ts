import { RawLoan, PaidLoan } from '../interfaces/APIPayload';
import { Client, Endpoints } from '..';
import { BaseGameComponent } from "./BaseGameComponent";

export class Loan extends BaseGameComponent {
    due: string;
    id: string;
    repaymentAmount: number;
    status: string;
    type: string;

    constructor(client: Client, loanData: RawLoan) {
        super(client);

        this.due = loanData.due;
        this.id = loanData.id;
        this.repaymentAmount = loanData.repaymentAmount;
        this.status = loanData.status;
        this.type = loanData.type;
    }

    public pay() {
        if (this.client.credits < this.repaymentAmount) throw new Error('You do not have enough credits to pay for this loan');
        return (this.client.request('POST', Endpoints.LOAN(this.id), { auth: true }) as Promise<PaidLoan>)
        .then(data => {
            this.client.credits = data.credits;
            this.client.loans.cache.delete(data.loans[0].id);
            return data.credits;
        });
    }
}