import assert from 'assert';
import Client from '../dist/Client.js';

describe('Client', () => {
    const client = new Client();
    describe('Tmio', async () => {
        it('getTotdMapId', async () => {
            const id = await client.getTotdMapId();
            assert.ok(id);
        });
        it('getTotdMap', async () => {
            const totd = await client.getTotdMap();
            assert.ok(totd.uid);
        });
        it('getCotd', async () => {
            const totd = await client.getCotd();
            assert.ok(totd.id);
        });
    });
});
