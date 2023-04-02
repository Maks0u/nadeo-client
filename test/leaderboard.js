import assert from 'assert';
import Client from '../dist/Client.js';
import { formatTime } from '../dist/Utils.js';

describe('Leaderboard', () => {
    const client = new Client();
    let campaign = {};
    let mapUids = [];
    let maps = new Map();
    it('get map list from campaign', async () => {
        campaign = await client.getCampaign('1v1 sunset');
        mapUids = campaign.campaign.playlist.map(m => m.mapUid);
        // console.log(mapUids);
        assert.ok(mapUids.length);
    });
    it('get maps infos', async () => {
        for (let uid of mapUids) {
            const map = await client.getMap(uid);
            maps.set(map.mapId, {
                uid: map.uid,
                mapId: map.mapId,
                name: map.name,
                records: [],
            });
        }
        // console.log(maps);
        assert.ok(maps.size);
    });
    it('get leaderboards from maps', async () => {
        const players = [
            '04bffe12-8efd-46cc-9eba-6c606574e5dc',
            '2c7c9ffd-1e43-46f2-87f0-984ed7011438',
            '6c5f44ab-9426-46e4-b1fb-62ea8b3ef52f',
            '724aaf97-e817-4fea-80ae-b12671c49ecd',
            '9815388e-6929-4913-a0fd-d94f19afbd8e',
            '9a75c1be-1eeb-4303-ad19-b77addbf7510',
            'bf06de13-8d35-431e-9ecc-8625797ef47e',
            'df70348a-8db0-4384-92b0-bdd909582cd4',
        ];
        const displayNames = new Map(
            (await client.getDisplayNames(players)).map(n => {
                return [n.accountId, n];
            })
        );
        const records = await client.getMapRecords(players, Array.from(maps.keys()));
        records.forEach(record => {
            maps.get(record.mapId).records.push({
                accountId: record.accountId,
                displayName: displayNames.get(record.accountId).displayName,
                time: record.recordScore.time,
            });
        });
        maps.forEach(map => {
            map.records.sort((a, b) => a.time - b.time);
        });
        const firstMapRecords = maps.values().next().value.records;
        // console.log(firstMapRecords);
        assert.ok(firstMapRecords.length);
    });
    it('format records', () => {
        maps.forEach(map => {
            const records = Array.from(map.records);
            const first = records.shift();
            map.records = records.reduce(
                (a, b) => `${a}\n${formatTime(b.time)} - ${b.displayName}`,
                `${formatTime(first.time)} - ${first.displayName}`
            );
        });
        // console.log(maps.values());
        assert.ok(maps.values().next().value.records.length);
    });
});
