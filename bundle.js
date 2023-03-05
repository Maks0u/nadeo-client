import Client from './src/Client.js';
export default Client;
export * from './src/Utils.js';

['UBI_USER_AGENT', 'UBI_APP_ID', 'UBI_CLIENT_ID', 'UBI_CLIENT_SECRET', 'UBI_BASE', 'NADEO_CORE_BASE', 'NADEO_LIVE_BASE'].forEach(key => {
    if (!process.env[key]) {
        throw new Error(`Please provide ${key}`);
    }
});
