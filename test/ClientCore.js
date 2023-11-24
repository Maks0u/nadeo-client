import assert from 'assert';
import Client from '../dist/Client.js';

describe('Client', () => {
    const client = new Client();
    describe('NadeoServices', async () => {
        it('getMapRecords', async () => {
            const records = await client.getMapRecords(['04bffe12-8efd-46cc-9eba-6c606574e5dc'], ['b2318ea4-d0e3-460c-a87d-dd5a0ececf5d']);
            assert.ok(records.length);
        });
    });
});
