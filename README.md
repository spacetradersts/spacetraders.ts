[![Spacetraders.ts](https://spacetradersts.github.io/website/img/logo.svg)](https://spacetradersts.github.io/website)

[![Build Status](https://travis-ci.org/spacetradersts/spacetraders.ts.svg?branch=master)](https://travis-ci.org/spacetradersts/spacetraders.ts)
[![Coverage Status](https://coveralls.io/repos/github/spacetradersts/spacetraders.ts/badge.svg?branch=master)](https://coveralls.io/github/spacetradersts/spacetraders.ts?branch=master)
[![npm version](https://badge.fury.io/js/spacetraders.ts.svg)](https://badge.fury.io/js/spacetraders.ts)
[![Dependency Status](https://david-dm.org/spacetradersts/spacetraders.ts.svg)](https://david-dm.org/spacetradersts/spacetraders.ts)
[![devDependency Status](https://david-dm.org/spacetradersts/spacetraders.ts/dev-status.svg)](https://david-dm.org/spacetradersts/spacetraders.ts#info=devDependencies)
[![NPM](https://nodei.co/npm/spacetraders.ts.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/spacetraders.ts/)

# spacetraders.ts (WIP)

An object-oriented TypeScript library for [spacetraders API](https://api.spacetraders.io/).

## Example usage:
creating an account then logging in
```ts
import { Client } from 'spacetraders.ts';

const client = new Client();
client.createAccount('username').then((newUser: UsernameClaimPayload) => {
    client.login(newUser.token);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.username}`);
});
```

The library is still in development and is not yet ready for production use. Contributions and stars are welcome and if you really like the project, support me on [Patreon](https://www.patreon.com/SirHDeveloper)
