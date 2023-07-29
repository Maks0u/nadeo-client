import NadeoClubServices from './NadeoClubServices.js';
import NadeoLiveServices from './NadeoLiveServices.js';
import NadeoServices from './NadeoServices.js';
import Tmio from './Tmio.js';
import Token from './Token.js';
import UbiServices from './UbiServices.js';
export default class Client extends UbiServices {
    coreToken = new Token();
    liveToken = new Token();
    clubToken = new Token();
    constructor() {
        super();
    }
    async getCoreToken() {
        this.coreToken = await this.getToken('NadeoServices', this.coreToken);
        return this.coreToken.toString();
    }
    async getLiveToken() {
        this.liveToken = await this.getToken('NadeoLiveServices', this.liveToken);
        return this.liveToken.toString();
    }
    async getClubToken() {
        this.clubToken = await this.getToken('NadeoClubServices', this.clubToken);
        return this.clubToken.toString();
    }
    async getToken(audience, token) {
        if (token.isObsolete()) {
            return await this.connect(audience);
        }
        if (token.isExpired()) {
            return await this.refreshToken(token);
        }
        return token;
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
    async getTotdMap() {
        return this.getMap(await Tmio.getTotdMapUid());
    }
    async getTotdMapId() {
        return Tmio.getTotdMapId();
    }
    async getMapRecords(accountIdList, mapIdList) {
        return await NadeoServices.getMapRecords(await this.getCoreToken(), accountIdList, mapIdList);
    }
    async getCompetition(competitionId) {
        return await NadeoClubServices.getCompetition(await this.getClubToken(), competitionId);
    }
    async getCompetitionLeaderboard(competitionId, length = 10, offset = 0) {
        return await NadeoClubServices.getCompetitionLeaderboard(await this.getClubToken(), competitionId, length, offset);
    }
    async getCompetitionRecords(competitionId, accountIdList, length = 64, offset = 0) {
        let records = [];
        const step = length > 255 ? 255 : length;
        for (let i = offset; i < length; i += 256) {
            records = records.concat(await this.getCompetitionLeaderboard(competitionId, step, i));
        }
        return records.filter(record => accountIdList.includes(record.participant));
    }
    async getCotd() {
        return Tmio.getCotd();
    }
}
