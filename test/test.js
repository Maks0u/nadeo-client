import assert from 'assert';
import Client from '../dist/Client.js';

describe('Client', () => {
    const client = new Client();
    describe('NadeoLiveServices', async () => {
        it('getClub', async () => {
            const club = await client.getClub('25');
            assert.equal(club.id, 25);
        });
        it('getClubMembers', async () => {
            const members = await client.getClubMembers('25', 1, 0);
            assert.ok(members.itemCount);
        });
        it('getClubActivities', async () => {
            const activities = await client.getClubActivities('25', 1, 0, true);
            assert.ok(activities.itemCount);
            assert.equal(activities.activityList[0].clubId, '25');
        });
        it('getCampaigns', async () => {
            const campaigns = await client.getCampaigns('Winter 2023', 1, 0);
            assert.ok(campaigns.itemCount);
        });
        it('getCampaign', async () => {
            const campaign = await client.getCampaign('ZrT TMCUP 2022');
            assert.equal(campaign.name, 'ZrT TMCUP 2022');
        });
        it('getMap', async () => {
            const map = await client.getMap('Mi7zQZ0frhDs_Be8fQHdDqfi5Sb');
            assert.equal(map.name, 'Winter 2023 - 24');
        });
    });
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
    describe('Tmio', async () => {
        it('getTotdMapId', async () => {
            const id = await client.getTotdMapId();
            assert.ok(id);
        });
        it('getTotdMap', async () => {
            const totd = await client.getTotdMap();
            assert.ok(totd.uid);
        });
    });
});
