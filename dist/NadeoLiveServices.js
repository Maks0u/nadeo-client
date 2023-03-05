import UbiServices from './UbiServices.js';
export default class NadeoLiveServices {
    constructor() { }
    static async get(token, path, params = {}) {
        const url = new URL(path, NadeoLiveServices.BASEURL);
        url.search = new URLSearchParams(Object.entries(params)).toString();
        return UbiServices.AXIOS.get(url.href, {
            headers: {
                Authorization: `nadeo_v1 t=${token}`,
            },
        })
            .then(response => {
            return response;
        })
            .catch(error => {
            throw new Error(error.message);
        });
    }
    static async getClub(token, clubId) {
        return (await this.get(token, `api/token/club/${clubId}`)).data;
    }
    static async getClubMembers(token, clubId, length, offset) {
        return (await this.get(token, `api/token/club/${clubId}/member`, { length: length, offset: offset })).data;
    }
    static async getCampaigns(token, name = '', length, offset) {
        return (await this.get(token, `api/token/club/campaign`, { length: length, offset: offset, name: name })).data;
    }
    static async getMap(token, mapUid) {
        return (await this.get(token, `api/token/map/${mapUid}`)).data;
    }
}
NadeoLiveServices.BASEURL = process.env.NADEO_LIVE_BASE || '';
