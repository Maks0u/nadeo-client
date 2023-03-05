export default class Token {
    private token;
    constructor(token?: string);
    set(token: string): Token;
    get(): string;
    private decode;
    isEmpty(): boolean;
    isExpired(): boolean;
    getUserName(): string;
    getUserId(): string;
}
