import { AxiosResponse } from 'axios';
import UbiServices from './UbiServices.js';

export default class NadeoServices {
    public static BASEURL: string = process.env.NADEO_CORE_BASE || '';

    constructor() {}

    private static async get(token: string, path: string, params: object = {}): Promise<AxiosResponse> {
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

    public static async getDisplayNames(
        token: string,
        accountIdList: string[]
    ): Promise<{ accountId: string; displayName: string; timestamp: string }[]> {
        return (await this.get(token, 'accounts/displayNames/', { accountIdList: accountIdList.join(',') })).data;
    }

    public static async getMapRecords(token: string, accountIdList: string[], mapIdList: string[]): Promise<Record[]> {
        return (
            await this.get(token, 'mapRecords/', {
                accountIdList: accountIdList.join(','),
                mapIdList: mapIdList.join(','),
            })
        ).data;
    }
}

export interface Record {
    accountId: string;
    gameMode: string;
    mapId: string;
    mapRecordId: string;
    medal: number;
    recordScore: { respawnCount: number; score: number; time: number };
    timestamp: string;
    url: string;
}
