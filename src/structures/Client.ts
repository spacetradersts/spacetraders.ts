import * as events from 'events';
import { Leaderboard } from "./Leaderboard";
import { LoanManager } from "../managers/LoanManager";
import { ShipManager } from "../managers/ShipManager";
import { isOnline } from "../rest/APIResponse";
import { StructureManager } from "../managers/StructureManager";
import { APIRequest, Endpoints, FlightPlanManager, LocationManager, SystemManager, Types } from "..";
import { RESTManager } from "../rest/RESTManager";
import type { GameStatusPayload, AccountPayload, ErrorPayload, UsernameClaimPayload } from '../interfaces/APIPayload';
import type { ClientOptions } from '../interfaces/Client';

export class Client extends events.EventEmitter {
    token: string;
    _api: RESTManager;
    ready: boolean;
    options: ClientOptions;
    username: string;
    credits: number;
    joinedAt: string;
    flightPlans: FlightPlanManager;
    loans: LoanManager;
    locations: LocationManager;
    ships: ShipManager;
    structures: StructureManager;
    systems: SystemManager;
    leaderboard: Leaderboard;
    types: Types;

    constructor(options?: ClientOptions) {
        super();
        this.options = options;
        this.flightPlans = new FlightPlanManager(this);
        this.loans = new LoanManager(this);
        this.locations = new LocationManager(this);
        this.ships = new ShipManager(this);
        this.structures = new StructureManager(this);
        this.systems = new SystemManager(this);
        this.leaderboard = new Leaderboard(this);
        this._api = new RESTManager(this);
        this.types = new Types(this);
    }

    public async login(token: string) {
        this.token = token;
        let gameStatus: GameStatusPayload,
        accountInfo: AccountPayload;
        try {
            gameStatus = await this.gameStatus() as GameStatusPayload;
        } catch (err) {
            console.log('game is likely offline');
            throw new Error(err);
        }
        finally {
            if (!isOnline(gameStatus.status)) throw new Error('game is not online');
            accountInfo = await this.receiveAccountInfo() as AccountPayload;
            if (this.isError(accountInfo)) throw new Error((accountInfo as unknown as ErrorPayload).error.message);
            Object.assign(this, {
                ...accountInfo.user,
                shipCount: null,
                structureCount: null
            });
            await this.setupGameItems();
            this.emit('ready');
        }
    }

    setInterval(callback: (...args: any[]) => void, ms?: number, ...args: any[]) {
        return setInterval(callback, ms, ...args);
    }

    clearInterval(timeoutId: NodeJS.Timeout) {
        return clearInterval(timeoutId);
    }

    setTimeout(callback: (...args: any[]) => void, ms?: number, ...args: any[]) {
        return setTimeout(callback, ms, ...args);
    }

    clearTimeout(timeoutId: NodeJS.Timeout) {
        return clearTimeout(timeoutId);
    }

    public request(method: string, endpoint: string, { body }: { body: object, auth?: boolean }): Promise<unknown>;
    public request(method: string, endpoint: string, { params }: { params: object, auth?: boolean }): Promise<unknown>;
    public request(method: string, endpoint: string, options?: { body?: object, params?: object, auth?: boolean }): Promise<unknown>;
    public request(method: string, endpoint: string, options?: { body?: object, params?: object, auth?: boolean }) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: options?.auth ? `Bearer ${this.token}` : null
        }
        const fetchOptions = {
            method,
            headers,
            body: (options?.body) ? JSON.stringify(options.body) : null
        }
        return this._api.push(new APIRequest({ client: this, path: endpoint, fetchOptions, params: options?.params ? options.params : null }));
    }

    public isError(payload: object): this is ErrorPayload {
        return !!(payload as any).error && Object.keys(payload).length == 1;
    }

    public gameStatus() {
        return this.request('GET', Endpoints.GAME_STATUS, { auth: false });
    }

    public receiveAccountInfo() {
        return this.request('GET', Endpoints.ACCOUNT_INFO, { auth: true });
    }

    public async createAccount(username: string) {
        const newAccount = (await this.request('POST', Endpoints.USER_CLAIM(username), { auth: false })) as UsernameClaimPayload;
        console.warn(`Make sure to not lose your account token: ${newAccount.token}`);
        return newAccount;
    }

    public async setupGameItems() {
        await this.loans.fetch();
        await this.ships.fetch();
        await this.structures.fetch();
    }
}