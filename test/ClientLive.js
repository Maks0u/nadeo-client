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
            const campaign = await client.getCampaign('ASCENSION 2023');
            assert.equal(campaign.name, 'ASCENSION 2023');
        });
        it('getMap', async () => {
            const map = await client.getMap('Mi7zQZ0frhDs_Be8fQHdDqfi5Sb');
            assert.equal(map.name, 'Winter 2023 - 24');
        });
    });
});
