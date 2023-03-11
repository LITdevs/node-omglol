import {beforeAll, describe, expect, test} from '@jest/globals';
import OmgClient from "./index";
import Address from "./classes/api/Address";
import Account from "./classes/api/Account";
import AccountSettings from "./classes/api/AccountSettings";

let client
let account
let settings
let addresses

beforeAll(async () => {
    // Reuse the same client and account for all test cases
    client = new OmgClient(process.env.TEST_TOKEN, process.env.TEST_EMAIL);
    account = await client.getAccount();
    settings = await account.getSettings();
    addresses = await account.getAddresses();
});

describe('Account',  () => {

    test('Client returns an Account', async () => {
        expect(account).toBeInstanceOf(Account);
    });

    test('Account has account information', async () => {
        expect(account.email).toBeTruthy();
        expect(account.name).toBeTruthy();
        expect(account.created).toBeInstanceOf(Object); // this is dumb but im not exactly sure what i should do here
    });

    test('Account has settings', async () => {
        expect(settings).toBeInstanceOf(AccountSettings) // "vukky water you doin" great question
    })

    test('Account has addresses', async () => {
        expect(addresses).toBeInstanceOf(Array<Address>)
    })
});