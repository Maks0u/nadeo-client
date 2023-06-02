import assert from 'assert';
import Client from '../dist/Client.js';

describe('Client', () => {
    const client = new Client();
    describe('NadeoClubServices', async () => {
        it('getCompetition', async () => {
            const competition = await client.getCompetition('6540');
            assert.equal(competition.id, 6540);
        });
        it('getCompetitionLeaderboard', async () => {
            const leaderboard = await client.getCompetitionLeaderboard('6540', 10, 0);
            assert.equal(leaderboard.length, 10);
        });
        it('getCompetitionLeaderboard 2', async () => {
            const leaderboard = await client.getCompetitionLeaderboard('6540', 10, 256);
            assert.equal(leaderboard.length, 10);
        });
        it('getCompetitionRecords', async () => {
            const records = await client.getCompetitionRecords('6376', ['9a75c1be-1eeb-4303-ad19-b77addbf7510'], 512);
            assert.equal(records.length, 1);
            assert.equal(records[0].rank, 288);
        });
        it('getCotdRecords', async () => {
            const records = await client.getCotdRecords(
                ['da4642f9-6acf-43fe-88b6-b120ff1308ba', '05477e79-25fd-48c2-84c7-e1621aa46517', 'd46fb45d-d422-47c9-9785-67270a311e25'],
                10
            );
            assert.ok(records.length);
        });
    });
});
