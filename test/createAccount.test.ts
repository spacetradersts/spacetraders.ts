require('dotenv').config();
import 'source-map-support/register';
import { Client } from '../src/structures/Client';

describe('create new client', () => {
    const client = new Client({});
    test('create new account then log into it', done => {
        client.createAccount('testAccountslfkjlkfdsj').then((newUser) => client.login(newUser.token));
        client.on('ready', () => {
            console.log('works!');
            done();
        });
    });
});