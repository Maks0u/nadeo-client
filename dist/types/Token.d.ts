export default class Token {
    accessToken: UbiToken;
    refreshToken: UbiToken;
    constructor(accessTokenString?: string, refreshTokenString?: string);
    toString(): string;
    isExpired(): boolean;
    isObsolete(): boolean;
}
declare class UbiToken {
    private token;
    constructor(token?: string);
    toString(): string;
    private decode;
    isEmpty(): boolean;
    isExpired(): boolean;
    getExpirationDate(): number;
    getUserName(): string;
    getUserId(): string;
}
export {};
