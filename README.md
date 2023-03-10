## omg.lol API Wrapper

This is a wrapper for the omg.lol API. It is written in Typescript and is very easy to use.

## Installation

```bash
# With yarn
yarn add omg.lol
# With npm
npm install omg.lol
```

## Usage

```ts
// With ESM or TypeScript
import OmgClient from "omg.lol";

// With CommonJS
const OmgClient = require("omg.lol").default;

// Create a new client, with your token and email
// Email is required becase adam removed the endpoint that made it not required /lh
const client = new OmgClient(token, email);

// You can then call various API endpoints
// For example, to get an Account instance
const account = await client.getAccount();

// You can then call various methods on the Account instance
// For example, to get the addresses
const addresses = await account.getAddresses();

// Or active sessions
const sessions = await account.getActiveSessions();
// You can then destroy a session
await sessions[0].destroy();

// Full list of methods can be found NOWHERE because I'm too lazy to write docs, source code is your friend
```