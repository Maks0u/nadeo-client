import { AxiosResponse } from 'axios';
import UbiServices from './UbiServices.js';

export default class NadeoServices {
    public static BASEURL: string = process.env.NADEO_CORE_BASE || '';

    constructor() {}

    private static get(token: string, url: URL): Promise<AxiosResponse> {
        return UbiServices.AXIOS.get(url.href, {
            headers: {
                Authorization: `nadeo_v1 t=${token}`,
            },
        });
    }

    public static async getMapRecords(token: string, accountIdList: string[], mapIdList: string[]): Promise<Object> {
        const url = new URL('mapRecords/', NadeoServices.BASEURL);
        url.search = new URLSearchParams({ accountIdList: accountIdList.join(','), mapIdList: mapIdList.join(',') }).toString();
        return (await this.get(token, url)).data;
    }
}
