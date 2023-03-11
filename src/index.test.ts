import {describe, expect, test} from '@jest/globals';
import OmgClient from "./index";
import Address from "./classes/api/Address";
import Account from "./classes/api/Account";

describe('OmgClient', () => {
    test('Creates client', () => {
        expect(new OmgClient()).toBeInstanceOf(OmgClient);
    });

    test('Throws unauthenticated error for unauthenticated getAccount call', () => {
        expect(() => {
            new OmgClient().getAccount();
        }).toThrowError('You are not authenticated');
    });

    test('getAddress works without authentication and returns Address', async () => {
        let client = new OmgClient();
        expect(await client.getAddress('test')).toBeInstanceOf(Address);
    })

    test('getAccount works with authentication and returns Account', async () => {
        let client = new OmgClient(process.env.TEST_TOKEN, process.env.TEST_EMAIL);
        expect(await client.getAccount()).toBeInstanceOf(Account);
    })
});