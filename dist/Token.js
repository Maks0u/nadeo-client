export default class Token {
    accessToken;
    refreshToken;
    constructor(accessTokenString = '', refreshTokenString = '') {
        this.accessToken = new UbiToken(accessTokenString);
        this.refreshToken = new UbiToken(refreshTokenString);
    }
    toString() {
        return this.accessToken.toString();
    }
    isExpired() {
        return this.accessToken.isExpired();
    }
    isObsolete() {
        return this.accessToken.isExpired() && this.refreshToken.isExpired();
    }
}
class UbiToken {
    token;
    constructor(token = '') {
        this.token = token;
    }
    toString() {
        return this.token;
    }
    decode() {
        return new DecodedToken(this.token);
    }
    isEmpty() {
        return 0 === this.token.length;
    }
    isExpired() {
        return this.isEmpty() || Date.now() > this.getExpirationDate() * 1000;
    }
    getExpirationDate() {
        return this.decode().exp;
    }
    getUserName() {
        return this.decode().aun;
    }
    getUserId() {
        return this.decode().sub;
    }
}
class DecodedToken {
    jti;
    iss;
    iat;
    rat;
    exp;
    aud;
    usg;
    sid;
    sub;
    aun;
    rtk;
    pce;
    ubiservices_uid;
    constructor(token) {
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
