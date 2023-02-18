//     await service.mapRecords(
//         ['04bffe12-8efd-46cc-9eba-6c606574e5dc', '724aaf97-e817-4fea-80ae-b12671c49ecd'],
//         ['778c1c1e-f709-4c4a-8f4b-08c8984fd545']
//     )

import Client from './src/Client.js';

async function main() {
    const client = new Client();
    const records = await client.getMapRecords(
        ['04bffe12-8efd-46cc-9eba-6c606574e5dc', '724aaf97-e817-4fea-80ae-b12671c49ecd'],
        ['778c1c1e-f709-4c4a-8f4b-08c8984fd545']
    );
    console.log(records);
}
main();
