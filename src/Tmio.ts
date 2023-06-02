import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class Tmio {
    private static USER_AGENT: string = process.env.TMIO_USER_AGENT || '';
    private static BASEURL: string = process.env.TMIO_BASE || '';

    public static AXIOS: AxiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': Tmio.USER_AGENT,
        },
    });

    constructor() {}

    private static async get(path: string, params: object = {}): Promise<AxiosResponse> {
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

    public static async getTotdMapId(): Promise<string> {
        return (await this.get('totd/0')).data.days.pop().map.mapId;
    }

    public static async getTotdMapUid(): Promise<string> {
        return (await this.get('totd/0')).data.days.pop().map.mapUid;
    }

    public static async getCotd(): Promise<Cotd> {
        return (await this.get('cotd/0')).data.competitions.filter((item: Cotd) => Date.now() > item.starttime * 1000).shift();
    }
}

export interface Cotd {
    id: number;
    name: string;
    players: number;
    starttime: number;
    endtime: number;
}
