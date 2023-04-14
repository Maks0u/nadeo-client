import axios from 'axios';
export default class Tmio {
    static USER_AGENT = process.env.TMIO_USER_AGENT || '';
    static BASEURL = process.env.TMIO_BASE || '';
    static AXIOS = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': Tmio.USER_AGENT,
        },
    });
    constructor() { }
    static async get(path, params = {}) {
        const url = new URL(path, Tmio.BASEURL);
        url.search = new URLSearchParams(Object.entries(params)).toString();
        return Tmio.AXIOS.get(url.href)
            .then(response => {
            return response;
        })
            .catch(error => {
            throw new Error(error.message);
        });
    }
    static async getTotdMapId() {
        return (await this.get('totd/0')).data.days.pop().map.mapId;
    }
    static async getTotdMapUid() {
        return (await this.get('totd/0')).data.days.pop().map.mapUid;
    }
}
