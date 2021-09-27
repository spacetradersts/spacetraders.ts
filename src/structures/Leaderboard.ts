import type { LeaderboardPayload, LeaderboardUser } from '../interfaces/APIPayload';
import type { BaseFetchOptions } from '../interfaces/Options';
import { Collection } from '../util/Collection';
import { Client, Endpoints } from '..';
import { BaseGameComponent } from './BaseGameComponent';

export class Leaderboard extends BaseGameComponent {
    _initialized: boolean;
    ranks: Collection<number, LeaderboardUser>;

    constructor(client: Client) {
        super(client);
    }

    public get list() {
        return this._initialized ? this.ranks.map((user, rank) => `${rank}. ${user.username} - Networth: ${user.netWorth}`).join('\n') : `leaderboard isn't initialized, please use fetch()`;
    }

    public async fetch(options?: BaseFetchOptions) {
        const data = await (this.client.request('GET', Endpoints.LEADERBOARD, { auth: true }) as Promise<LeaderboardPayload>);
        const leaderboard = new Collection<number, LeaderboardUser>(data.netWorth.map(rankedUser => [rankedUser.rank, rankedUser]));
        if (options?.cache || !('cache' in options))
            this.ranks = leaderboard;
        return leaderboard;
    }
}