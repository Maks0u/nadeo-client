import axios from 'axios';
import { requestErrorLogger, requestLogger } from './Utils.js';
const requestHandler = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': process.env.TMIO_USER_AGENT || '',
    },
});
requestHandler.interceptors.response.use(requestLogger, requestErrorLogger);
export default class Tmio {
    static BASEURL = process.env.TMIO_BASE || '';
    static AXIOS = requestHandler;
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
    static async getCotd() {
        return (await this.get('cotd/0')).data.competitions.filter((item) => Date.now() > item.starttime * 1000).shift();
    }
}
