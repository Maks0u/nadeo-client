import NadeoClubServices, { Competition, CompetitionRecord } from './NadeoClubServices.js';
import NadeoLiveServices, { Campaign, Campaigns, Club, ClubActivities, ClubMembers, Map } from './NadeoLiveServices.js';
import NadeoServices, { Record } from './NadeoServices.js';
import Tmio from './Tmio.js';
import Token from './Token.js';
import UbiServices from './UbiServices.js';

export default class Client extends UbiServices {
    private coreToken: Token = new Token();
    private coreRefreshToken: Token = new Token();
    private liveToken: Token = new Token();
    private liveRefreshToken: Token = new Token();
    private clubToken: Token = new Token();
    private clubRefreshToken: Token = new Token();

    constructor() {
        super();
    }

    private async getCoreToken(): Promise<string> {
        return this.getToken('NadeoServices', this.coreToken, this.coreRefreshToken);
    }

    private async getLiveToken(): Promise<string> {
        return this.getToken('NadeoLiveServices', this.liveToken, this.liveRefreshToken);
    }

    private async getClubToken(): Promise<string> {
        return this.getToken('NadeoClubServices', this.clubToken, this.clubRefreshToken);
    }

    private async getToken(audience: string, thisToken: Token, thisRefreshToken: Token): Promise<string> {
        if (thisToken.isEmpty() || thisRefreshToken.isExpired()) {
            const { accessToken, refreshToken } = await this.connect(audience);
            thisToken.set(accessToken);
            thisRefreshToken.set(refreshToken);
        }
        if (thisToken.isExpired()) {
            const { accessToken, refreshToken } = await this.refreshTokens(thisRefreshToken.get());
            thisToken.set(accessToken);
            thisRefreshToken.set(refreshToken);
        }
        return thisToken.get();
    }

    async getClub(clubId: string): Promise<Club> {
        return await NadeoLiveServices.getClub(await this.getLiveToken(), clubId);
    }

    async getClubMembers(clubId: string, length: number = 20, offset: number = 0): Promise<ClubMembers> {
        return await NadeoLiveServices.getClubMembers(await this.getLiveToken(), clubId, length, offset);
    }

    async getDisplayNames(accountIdList: string[]): Promise<{ accountId: string; displayName: string; timestamp: string }[]> {
        return await NadeoServices.getDisplayNames(await this.getCoreToken(), accountIdList);
    }

    async getClubActivities(clubId: string, length: number = 10, offset: number = 0, active: boolean = true): Promise<ClubActivities> {
        return await NadeoLiveServices.getClubActivities(await this.getLiveToken(), clubId, length, offset, active);
    }

    async getCampaigns(name: string, length: number = 10, offset: number = 0): Promise<Campaigns> {
        return await NadeoLiveServices.getCampaigns(await this.getLiveToken(), name, length, offset);
    }

    async getCampaign(name: string): Promise<Campaign> {
        const search = await this.getCampaigns(name, 1, 0);
        return search.clubCampaignList[0];
    }

    async getMap(mapUid: string): Promise<Map> {
        return await NadeoLiveServices.getMap(await this.getLiveToken(), mapUid);
    }

    async getTotdMap(): Promise<Map> {
        return this.getMap(await Tmio.getTotdMapUid());
    }

    async getTotdMapId(): Promise<string> {
        return Tmio.getTotdMapId();
    }

    async getMapRecords(accountIdList: string[], mapIdList: string[]): Promise<Record[]> {
        return await NadeoServices.getMapRecords(await this.getCoreToken(), accountIdList, mapIdList);
    }

    async getCompetition(competitionId: string): Promise<Competition> {
        return await NadeoClubServices.getCompetition(await this.getClubToken(), competitionId);
    }

    async getCompetitionLeaderboard(competitionId: string, length: number = 10, offset: number = 0): Promise<CompetitionRecord[]> {
        return await NadeoClubServices.getCompetitionLeaderboard(await this.getClubToken(), competitionId, length, offset);
    }

    async getCompetitionRecords(
        competitionId: string,
        accountIdList: string[],
        length: number = 64,
        offset: number = 0
    ): Promise<CompetitionRecord[]> {
        let records: CompetitionRecord[] = [];
        const step = length > 255 ? 255 : length;
        for (let i = offset; i < length; i += 256) {
            records = records.concat(await this.getCompetitionLeaderboard(competitionId, step, i));
        }
        return records.filter(record => accountIdList.includes(record.participant));
    }

    async getCotdRecords(accountIdList: string[], length: number = 255, offset: number = 0): Promise<CompetitionRecord[]> {
        const competitionId = (await Tmio.getCotd()).id;
        return this.getCompetitionRecords(`${competitionId}`, accountIdList, length, offset);
    }
}
