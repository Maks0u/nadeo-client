export default class Token {
    token;
    constructor(token = '') {
        this.token = token;
    }
    set(token) {
        this.token = token;
        return this;
    }
    get() {
        return this.token;
    }
    decode() {
        return new DecodedToken(this.token);
    }
    isEmpty() {
        return 0 === this.token.length;
    }
    isExpired() {
        return Date.now() > this.decode().exp * 1000;
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
