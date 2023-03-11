import {beforeAll, describe, expect, test} from '@jest/globals';
import OmgClient from "../../index";

let client

beforeAll(async () => {
    // Reuse the same client and account for all test cases
    client = new OmgClient(process.env.TEST_TOKEN, process.env.TEST_EMAIL);
});

describe('OmgClient', () => {
    test('getAddressAvailability works', async () => {
        expect(await client.getAddressAvailability("this-was-a-triumph")).toBeInstanceOf(Object);
    })

    test('getAddressExpiration works', async () => {
        expect(await client.getAddressExpiration("adam")).toBeInstanceOf(Object);
    })
});