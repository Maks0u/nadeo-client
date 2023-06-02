import Client from './dist/Client.js';
export default Client;
export * from './dist/Utils.js';

[
    'UBI_USER_AGENT',
    'UBI_APP_ID',
    'UBI_CLIENT_ID',
    'UBI_CLIENT_SECRET',
    'UBI_BASE',
    'NADEO_CORE_BASE',
    'NADEO_LIVE_BASE',
    'NADEO_CLUB_BASE',
    'NADEO_COMPETITION_BASE',
    'NADEO_MATCHMAKING_BASE',
    'TMIO_USER_AGENT',
    'TMIO_BASE',
].forEach(key => {
    if (!process.env[key]) {
        throw new Error(`Please provide ${key}`);
    }
});
