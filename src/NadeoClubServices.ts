import { AxiosResponse } from 'axios';
import UbiServices from './UbiServices.js';

export default class NadeoClubServices {
    public static BASEURL = {
        CLUB: process.env.NADEO_CLUB_BASE || '',
        COMPETITION: process.env.NADEO_COMPETITION_BASE || '',
        MATCHMAKING: process.env.NADEO_MATCHMAKING_BASE || '',
    };

    constructor() {}

    private static async get(token: string, baseurl: string, path: string, params: object = {}): Promise<AxiosResponse> {
        const url = new URL(path, baseurl);
        url.search = new URLSearchParams(Object.entries(params)).toString();
        return UbiServices.AXIOS.get(url.href, {
            headers: {
                Authorization: `nadeo_v1 t=${token}`,
            },
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }

    public static async getCompetition(token: string, competitionId: string): Promise<Competition> {
        return (await this.get(token, this.BASEURL.COMPETITION, `api/competitions/${competitionId}`)).data;
    }

    public static async getCompetitionLeaderboard(
        token: string,
        competitionId: string,
        length: number,
        offset: number
    ): Promise<CompetitionRecord[]> {
        return (
            await this.get(token, this.BASEURL.COMPETITION, `api/competitions/${competitionId}/leaderboard`, {
                length: length,
                offset: offset,
            })
        ).data;
    }
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
