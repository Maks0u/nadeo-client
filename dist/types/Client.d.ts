import { Competition, CompetitionRecord } from './NadeoClubServices.js';
import { Campaign, Campaigns, Club, ClubActivities, ClubMembers, Map } from './NadeoLiveServices.js';
import { Record } from './NadeoServices.js';
import { Cotd } from './Tmio.js';
import UbiServices from './UbiServices.js';
export default class Client extends UbiServices {
    private coreToken;
    private liveToken;
    private clubToken;
    constructor();
    private getCoreToken;
    private getLiveToken;
    private getClubToken;
    private getToken;
    getClub(clubId: string): Promise<Club>;
    getClubMembers(clubId: string, length?: number, offset?: number): Promise<ClubMembers>;
    getDisplayNames(accountIdList: string[]): Promise<{
        accountId: string;
        displayName: string;
        timestamp: string;
    }[]>;
    getClubActivities(clubId: string, length?: number, offset?: number, active?: boolean): Promise<ClubActivities>;
    getCampaigns(name: string, length?: number, offset?: number): Promise<Campaigns>;
    getCampaign(name: string): Promise<Campaign>;
    getMap(mapUid: string): Promise<Map>;
    getTotdMap(): Promise<Map>;
    getTotdMapId(): Promise<string>;
    getMapRecords(accountIdList: string[], mapIdList: string[]): Promise<Record[]>;
    getCompetition(competitionId: string): Promise<Competition>;
    getCompetitionLeaderboard(competitionId: string, length?: number, offset?: number): Promise<CompetitionRecord[]>;
    getCompetitionRecords(competitionId: string, accountIdList: string[], length?: number, offset?: number): Promise<CompetitionRecord[]>;
    getCotd(): Promise<Cotd>;
}
