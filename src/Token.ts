export default class Token {
    accessToken: UbiToken;
    refreshToken: UbiToken;
    constructor(accessTokenString: string = '', refreshTokenString: string = '') {
        this.accessToken = new UbiToken(accessTokenString);
        this.refreshToken = new UbiToken(refreshTokenString);
    }
    toString(): string {
        return this.accessToken.toString();
    }
    isExpired(): boolean {
        return this.accessToken.isExpired();
    }
    isObsolete(): boolean {
        return this.accessToken.isExpired() && this.refreshToken.isExpired();
    }
}

class UbiToken {
    private token: string;
    constructor(token: string = '') {
        this.token = token;
    }
    toString(): string {
        return this.token;
    }
    private decode() {
        return new DecodedToken(this.token);
    }
    isEmpty(): boolean {
        return 0 === this.token.length;
    }
    isExpired(): boolean {
        return this.isEmpty() || Date.now() > this.getExpirationDate() * 1000;
    }
    getExpirationDate(): number {
        return this.decode().exp;
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
