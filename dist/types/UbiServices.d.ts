import { AxiosInstance } from 'axios';
import Token from './Token.js';
export default class UbiServices {
    private static UBI_BASE;
    private static UBI_APP_ID;
    private static BASIC_AUTH;
    static AXIOS: AxiosInstance;
    constructor();
    protected connect(audience?: string): Promise<Token>;
    private requestTicket;
    private requestToken;
    protected refreshToken(token: Token): Promise<Token>;
}
