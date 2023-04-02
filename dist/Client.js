import NadeoLiveServices from './NadeoLiveServices.js';
import NadeoServices from './NadeoServices.js';
import Token from './Token.js';
import UbiServices from './UbiServices.js';
export default class Client extends UbiServices {
    coreToken = new Token();
    coreRefreshToken = new Token();
    liveToken = new Token();
    liveRefreshToken = new Token();
    constructor() {
        super();
    }
    async getCoreToken() {
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
    async getLiveToken() {
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
    async getClub(clubId) {
        return await NadeoLiveServices.getClub(await this.getLiveToken(), clubId);
    }
    async getClubMembers(clubId, length = 20, offset = 0) {
        return await NadeoLiveServices.getClubMembers(await this.getLiveToken(), clubId, length, offset);
    }
    async getDisplayNames(accountIdList) {
        return await NadeoServices.getDisplayNames(await this.getCoreToken(), accountIdList);
    }
    async getClubActivities(clubId, length = 10, offset = 0, active = true) {
        return await NadeoLiveServices.getClubActivities(await this.getLiveToken(), clubId, length, offset, active);
    }
    async getCampaigns(name, length = 10, offset = 0) {
        return await NadeoLiveServices.getCampaigns(await this.getLiveToken(), name, length, offset);
    }
    async getCampaign(name) {
        const search = await this.getCampaigns(name, 1, 0);
        return search.clubCampaignList[0];
    }
    async getMap(mapUid) {
        return await NadeoLiveServices.getMap(await this.getLiveToken(), mapUid);
    }
    async getMapRecords(accountIdList, mapIdList) {
        return await NadeoServices.getMapRecords(await this.getCoreToken(), accountIdList, mapIdList);
    }
}
