require('dotenv').config();
import 'source-map-support/register';
import { Client } from '../src/structures/Client';

describe('create new client', () => {
    const client = new Client({});
    test('log into client', done => {
        client.login(process.env.USER_TOKEN);
        client.on('ready', () => {
            console.log('works!');
            done();
        });
    });
});