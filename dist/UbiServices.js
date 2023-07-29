import axios from 'axios';
import logger from 'logger';
import NadeoServices from './NadeoServices.js';
import Token from './Token.js';
import { requestErrorLogger, requestLogger } from './Utils.js';
const requestHandler = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': process.env.UBI_USER_AGENT || '',
    },
});
requestHandler.interceptors.response.use(requestLogger, requestErrorLogger);
export default class UbiServices {
    static UBI_BASE = process.env.UBI_BASE || '';
    static UBI_APP_ID = process.env.UBI_APP_ID || '';
    static BASIC_AUTH = `Basic ${Buffer.from(`${process.env.UBI_CLIENT_ID}:${process.env.UBI_CLIENT_SECRET}`, 'utf-8').toString('base64')}`;
    static AXIOS = requestHandler;
    constructor() { }
    async connect(audience = 'NadeoServices') {
        const ticket = await this.requestTicket();
        const token = await this.requestToken(ticket, audience);
        logger.verbose(`new connection \u00b7 ${audience}`);
        return token;
    }
    async requestTicket() {
        const url = new URL('v3/profiles/sessions', UbiServices.UBI_BASE);
        const response = await UbiServices.AXIOS.post(url.href, {}, {
            headers: {
                'Ubi-AppId': UbiServices.UBI_APP_ID,
                Authorization: UbiServices.BASIC_AUTH,
            },
        });
        return response.data?.ticket;
    }
    async requestToken(ticket, audience) {
        const url = new URL('v2/authentication/token/ubiservices', NadeoServices.BASEURL);
        const response = await UbiServices.AXIOS.post(url.href, { audience: audience }, {
            headers: {
                Authorization: `ubi_v1 t=${ticket}`,
            },
        });
        return new Token(response.data?.accessToken, response.data?.refreshToken);
    }
    async refreshToken(token) {
        const url = new URL('v2/authentication/token/refresh', NadeoServices.BASEURL);
        const response = await UbiServices.AXIOS.post(url.href, {}, {
            headers: {
                Authorization: `nadeo_v1 t=${token.refreshToken.toString()}`,
            },
        });
        return new Token(response.data?.accessToken, response.data?.refreshToken);
    }
}
