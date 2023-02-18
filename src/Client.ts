import NadeoServices from './NadeoServices.js';
import UbiServices from './UbiServices.js';

export default class Client extends UbiServices {
    private token: Token = new Token();
    private refreshToken: Token = new Token();

    constructor() {
        super();
    }

    private async getToken(): Promise<string> {
        if (this.token.isEmpty() || this.refreshToken.isExpired()) {
            const { accessToken, refreshToken } = await this.connect();
            this.token.set(accessToken);
            this.refreshToken.set(refreshToken);
            console.log(`Successful connection from ${this.token.getUserName()}`);
        }
        if (this.token.isExpired()) {
            const { accessToken, refreshToken } = await this.refreshTokens(this.refreshToken.get());
            this.token.set(accessToken);
            this.refreshToken.set(refreshToken);
            console.log(`Successful refresh from ${this.token.getUserName()}`);
        }
        return this.token.get();
    }

    async getMapRecords(accountIdList: string[], mapIdList: string[]): Promise<Object> {
        return await NadeoServices.getMapRecords(await this.getToken(), accountIdList, mapIdList);
    }
}

class Token {
    private token: string;
    constructor(token: string = '') {
        this.token = token;
    }
    set(token: string): Token {
        this.token = token;
        return this;
    }
    get(): string {
        return this.token;
    }
    private decode() {
        return new DecodedToken(this.token);
    }
    isEmpty(): boolean {
        return 0 === this.token.length;
    }
    isExpired(): boolean {
        return Date.now() > this.decode().exp * 1000;
    }
    getUserName(): string {
        return this.decode().aun;
    }
    getUserId(): string {
        return this.decode().sub;
    }
}

class DecodedToken {
    jti: string;
    iss: string;
    iat: number;
    rat: number;
    exp: number;
    aud: string;
    usg: string;
    sid: string;
    sub: string;
    aun: string;
    rtk: boolean;
    pce: boolean;
    ubiservices_uid: string;
    constructor(token: string) {
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
        this.jti = decoded.jti;
        this.iss = decoded.iss;
        this.iat = decoded.iat;
        this.rat = decoded.rat;
        this.exp = decoded.exp;
        this.aud = decoded.aud;
        this.usg = decoded.usg;
        this.sid = decoded.sid;
        this.sub = decoded.sub;
        this.aun = decoded.aun;
        this.rtk = decoded.rtk;
        this.pce = decoded.pce;
        this.ubiservices_uid = decoded.ubiservices_uid;
    }
}
