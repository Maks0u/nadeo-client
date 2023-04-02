import NadeoLiveServices, { Campaign, Campaigns, Club, ClubActivities, ClubMembers, Map } from './NadeoLiveServices.js';
import NadeoServices, { Record } from './NadeoServices.js';
import Token from './Token.js';
import UbiServices from './UbiServices.js';

export default class Client extends UbiServices {
    private coreToken: Token = new Token();
    private coreRefreshToken: Token = new Token();
    private liveToken: Token = new Token();
    private liveRefreshToken: Token = new Token();

    constructor() {
        super();
    }

    private async getCoreToken(): Promise<string> {
        if (this.coreToken.isEmpty() || this.coreRefreshToken.isExpired()) {
            const { accessToken, refreshToken } = await this.connect();
            this.coreToken.set(accessToken);
            this.coreRefreshToken.set(refreshToken);
        }
        if (this.coreToken.isExpired()) {
            const { accessToken, refreshToken } = await this.refreshTokens(this.coreRefreshToken.get());
            this.coreToken.set(accessToken);
            this.coreRefreshToken.set(refreshToken);
        }
        return this.coreToken.get();
    }

    private async getLiveToken(): Promise<string> {
        if (this.liveToken.isEmpty() || this.liveRefreshToken.isExpired()) {
            const { accessToken, refreshToken } = await this.connect('NadeoLiveServices');
            this.liveToken.set(accessToken);
            this.liveRefreshToken.set(refreshToken);
        }
        if (this.liveToken.isExpired()) {
            const { accessToken, refreshToken } = await this.refreshTokens(this.liveRefreshToken.get());
            this.liveToken.set(accessToken);
            this.liveRefreshToken.set(refreshToken);
        }
        return this.liveToken.get();
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

    async getMapRecords(accountIdList: string[], mapIdList: string[]): Promise<Record[]> {
        return await NadeoServices.getMapRecords(await this.getCoreToken(), accountIdList, mapIdList);
    }
}
