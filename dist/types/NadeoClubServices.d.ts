export default class NadeoClubServices {
    static BASEURL: {
        CLUB: string;
        COMPETITION: string;
        MATCHMAKING: string;
    };
    constructor();
    private static get;
    static getCompetition(token: string, competitionId: string): Promise<Competition>;
    static getCompetitionLeaderboard(token: string, competitionId: string, length: number, offset: number): Promise<CompetitionRecord[]>;
}
export interface Competition {
    id: number;
    liveId: string;
    creator: string;
    name: string;
    participantType: string;
    startDate: number;
    endDate: number;
    nbPlayers: number;
    leaderboardId: number;
}
export interface CompetitionRecord {
    participant: string;
    rank: number;
    score: number;
    zone: string;
}
