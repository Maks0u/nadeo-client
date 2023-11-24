import UbiServices from './UbiServices.js';
export default class NadeoServices {
    static BASEURL = process.env.NADEO_CORE_BASE || '';
    constructor() { }
    static async get(token, path, params = {}) {
        const url = new URL(path, NadeoServices.BASEURL);
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
    static async getMapRecords(token, accountIdList, mapIdList) {
        return (await this.get(token, 'mapRecords/', {
            accountIdList: accountIdList.join(','),
            mapIdList: mapIdList.join(','),
        })).data;
    }
}
