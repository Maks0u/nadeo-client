import axios, { AxiosInstance } from 'axios';
import NadeoServices from './NadeoServices.js';

export default class UbiServices {
    private static USER_AGENT: string = process.env.USER_AGENT || '';
    private static UBI_BASE: string = process.env.UBI_BASE || '';
    private static UBI_APP_ID: string = process.env.UBI_APP_ID || '';
    private static BASIC_AUTH: string = `Basic ${Buffer.from(
        `${process.env.UBI_CLIENT_ID}:${process.env.UBI_CLIENT_SECRET}`,
        'utf-8'
    ).toString('base64')}`;

    public static AXIOS: AxiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': UbiServices.USER_AGENT,
        },
    });

    constructor() {}

    protected async connect(): Promise<{ accessToken: string; refreshToken: string }> {
        const ticket = await this.requestTicket();
        return await this.requestTokens(ticket);
    }

    private async requestTicket(): Promise<string> {
        const url = new URL('v3/profiles/sessions', UbiServices.UBI_BASE);
        const response = await UbiServices.AXIOS.post(
            url.href,
            {},
            {
                headers: {
                    'Ubi-AppId': UbiServices.UBI_APP_ID,
                    Authorization: UbiServices.BASIC_AUTH,
                },
            }
        );
        console.log(`Ticket request from ${response.data.nameOnPlatform}`);
        return response.data.ticket;
    }

    private async requestTokens(
        ticket: string,
        audience: string = 'NadeoServices'
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const url = new URL('v2/authentication/token/ubiservices', NadeoServices.BASEURL);
        const response = await UbiServices.AXIOS.post(
            url.href,
            { audience: audience },
            {
                headers: {
                    Authorization: `ubi_v1 t=${ticket}`,
                },
            }
        );
        return response.data;
    }

    protected async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const url = new URL('v2/authentication/token/refresh', NadeoServices.BASEURL);
        const response = await UbiServices.AXIOS.post(
            url.href,
            {},
            {
                headers: {
                    Authorization: `nadeo_v1 t=${refreshToken}`,
                },
            }
        );
        return response.data;
    }
}
