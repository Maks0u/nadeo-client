import { AxiosInstance } from 'axios';
export default class Tmio {
    private static USER_AGENT;
    private static BASEURL;
    static AXIOS: AxiosInstance;
    constructor();
    private static get;
    static getTotdMapId(): Promise<string>;
    static getTotdMapUid(): Promise<string>;
}
