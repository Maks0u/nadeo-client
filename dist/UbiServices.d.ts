import { AxiosInstance } from 'axios';
export default class UbiServices {
    private static USER_AGENT;
    private static UBI_BASE;
    private static UBI_APP_ID;
    private static BASIC_AUTH;
    static AXIOS: AxiosInstance;
    constructor();
    protected connect(audience?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private requestTicket;
    private requestTokens;
    protected refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
