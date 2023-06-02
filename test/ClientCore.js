import assert from 'assert';
import Client from '../dist/Client.js';

describe('Client', () => {
    const client = new Client();
    describe('NadeoServices', async () => {
        it('getDisplayNames', async () => {
            const names = await client.getDisplayNames(['04bffe12-8efd-46cc-9eba-6c606574e5dc']);
            assert.equal(names[0].accountId, '04bffe12-8efd-46cc-9eba-6c606574e5dc');
        });
        it('getMapRecords', async () => {
            const records = await client.getMapRecords(['04bffe12-8efd-46cc-9eba-6c606574e5dc'], ['b2318ea4-d0e3-460c-a87d-dd5a0ececf5d']);
            assert.ok(records.length);
        });
    });
});
