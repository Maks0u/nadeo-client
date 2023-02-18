import Client from './src/Client.js';
import { formatTime } from './src/Utils.js';

async function main() {
    const client = new Client();
    const campaign = await client.getCampaign('1v1 SunSet');
    const mapUids = campaign.campaign.playlist.map(item => item.mapUid);

    const mapIds = await Promise.all(
        mapUids.map(async uid => {
            const map = await client.getMap(uid);
            return map.mapId;
        })
    );

    const members = await client.getClubMembers('51630');
    const membersIds = members.clubMemberList.map(m => m.accountId);

    const displayNames = await client.getDisplayNames(membersIds);

    const records = await client.getMapRecords(membersIds, mapIds);

    let mapLeaderboards = {};
    mapIds.forEach(id => (mapLeaderboards[id] = []));

    records.forEach(r => {
        mapLeaderboards[r.mapId].push({
            accountId: r.accountId,
            displayName: displayNames.filter(item => r.accountId === item.accountId)[0]?.displayName,
            time: r.recordScore.time,
        });
    });

    Object.values(mapLeaderboards).forEach(l => l.sort((a, b) => a.time - b.time));

    let table = [];
    Object.values(mapLeaderboards).forEach(l => {
        const firstValue = l.shift();
        table.push(
            l.reduce(
                (previous, current) => `${previous}\n${formatTime(current.time)} - ${current.displayName}`,
                `${formatTime(firstValue.time)} - ${firstValue.displayName}`
            )
        );
        table.push('');
    });

    console.log(table.reduce((previous, current) => `${previous}\n${current}`));
}

main();
