export default class Token {
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
