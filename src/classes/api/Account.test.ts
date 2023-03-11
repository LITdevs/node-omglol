import {beforeAll, describe, expect, test} from '@jest/globals';
import OmgClient from "../../index";
import Address from "./Address";
import Account from "./Account";
import AccountSettings from "./AccountSettings";
import Session from './Session';

let client
let account

beforeAll(async () => {
    // Reuse the same client and account for all test cases
    client = new OmgClient(process.env.TEST_TOKEN, process.env.TEST_EMAIL);
    account = await client.getAccount();
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
        expect(await account.getSettings()).toBeInstanceOf(AccountSettings) // "vukky water you doin" great question
    })

    test('Account has addresses', async () => {
        let addresses = await account.getAddresses();
        expect(addresses).toBeInstanceOf(Array<Address>)
        console.log(addresses[0])
    })

    test('Account has sessions', async () => {
        expect(await account.getActiveSessions()).toBeInstanceOf(Array<Session>)
    })
});