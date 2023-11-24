export default class NadeoServices {
    static BASEURL: string;
    constructor();
    private static get;
    static getMapRecords(token: string, accountIdList: string[], mapIdList: string[]): Promise<Record[]>;
}
export interface Record {
    accountId: string;
    gameMode: string;
    mapId: string;
    mapRecordId: string;
    medal: number;
    recordScore: {
        respawnCount: number;
        score: number;
        time: number;
    };
    timestamp: string;
    url: string;
}
