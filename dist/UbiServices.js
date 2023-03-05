import axios from 'axios';
import NadeoServices from './NadeoServices.js';
export default class UbiServices {
    static USER_AGENT = process.env.UBI_USER_AGENT || '';
    static UBI_BASE = process.env.UBI_BASE || '';
    static UBI_APP_ID = process.env.UBI_APP_ID || '';
    static BASIC_AUTH = `Basic ${Buffer.from(`${process.env.UBI_CLIENT_ID}:${process.env.UBI_CLIENT_SECRET}`, 'utf-8').toString('base64')}`;
    static AXIOS = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': UbiServices.USER_AGENT,
        },
    });
    constructor() { }
    async connect(audience = 'NadeoServices') {
        const ticket = await this.requestTicket();
        return await this.requestTokens(ticket, audience);
    }
    async requestTicket() {
        const url = new URL('v3/profiles/sessions', UbiServices.UBI_BASE);
        const response = await UbiServices.AXIOS.post(url.href, {}, {
            headers: {
                'Ubi-AppId': UbiServices.UBI_APP_ID,
                Authorization: UbiServices.BASIC_AUTH,
            },
        });
        return response.data.ticket;
    }
    async requestTokens(ticket, audience) {
        const url = new URL('v2/authentication/token/ubiservices', NadeoServices.BASEURL);
        const response = await UbiServices.AXIOS.post(url.href, { audience: audience }, {
            headers: {
                Authorization: `ubi_v1 t=${ticket}`,
            },
        });
        return response.data;
    }
    async refreshTokens(refreshToken) {
        const url = new URL('v2/authentication/token/refresh', NadeoServices.BASEURL);
        const response = await UbiServices.AXIOS.post(url.href, {}, {
            headers: {
                Authorization: `nadeo_v1 t=${refreshToken}`,
            },
        });
        return response.data;
    }
}
