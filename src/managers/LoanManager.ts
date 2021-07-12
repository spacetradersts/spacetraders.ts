import { RawAvailableLoans, CreatedLoan, FetchedLoans, LoanType, RawLoan, RawAvailableLoan } from '../interfaces/APIPayload';
import { LoanFetchOptions } from '../interfaces/Options';
import Collection from '../util/Collection';
import { Client, Endpoints, Loan } from '..';
import { BaseManager } from './BaseManager';
import { AvailableLoan } from '../structures/AvailableLoan';

export class LoanManager extends BaseManager {
    public cache: Collection<string, Loan>;

    constructor(client: Client) {
        super(client);
        this.cache = new Collection<string, Loan>();
    }

    public create(type: LoanType) {
        return (this.client.request('POST', Endpoints.LOANS, { auth: true, params: { type } }) as Promise<CreatedLoan>)
        .then(data => {
                const loan = new Loan(this.client, data.loan);
                this.cache.set(data.loan.id, loan);
                return loan;
        });
    }

    public fetch(options: { available: boolean, cache?: boolean, force?: boolean }): Promise<Collection<string, AvailableLoan>>;
    public fetch(options?: { cache?: boolean, force?: boolean }): Promise<Collection<string, Loan>>;
    public fetch(options?: LoanFetchOptions) {
        if (!options?.force && !options?.available && this.cache.size > 0) return Promise.resolve(this.cache);
        return (this.client.request('GET', options?.available ? Endpoints.AVAILABLE_LOANS : Endpoints.LOANS, { auth: true }) as Promise<FetchedLoans | RawAvailableLoans>)
        .then((data) => {
            if (!options?.available) {
                const loans = new Collection<string, Loan>();
                for (let item of data.loans as RawLoan[]) {
                    const loan = new Loan(this.client, item);
                    if (options.cache || !('cache' in options)) this.cache.set(item.id, loan);
                    loans.set(item.id, loan);
                }
                return loans;
            }
            const availableLoans = new Collection<string, AvailableLoan>();
            for (let item of data.loans as RawAvailableLoan[]) {
                const availableLoan = new AvailableLoan(this.client, item);
                availableLoans.set(item.type, availableLoan);
            }
            return availableLoans;
        });
    }
}