import UbiServices from './UbiServices.js';
export default class NadeoClubServices {
    static BASEURL = {
        CLUB: process.env.NADEO_CLUB_BASE || '',
        COMPETITION: process.env.NADEO_COMPETITION_BASE || '',
        MATCHMAKING: process.env.NADEO_MATCHMAKING_BASE || '',
    };
    constructor() { }
    static async get(token, baseurl, path, params = {}) {
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
    static async getCompetition(token, competitionId) {
        return (await this.get(token, this.BASEURL.COMPETITION, `api/competitions/${competitionId}`)).data;
    }
    static async getCompetitionLeaderboard(token, competitionId, length, offset) {
        return (await this.get(token, this.BASEURL.COMPETITION, `api/competitions/${competitionId}/leaderboard`, {
            length: length,
            offset: offset,
        })).data;
    }
}
