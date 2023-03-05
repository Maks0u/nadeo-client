export default class NadeoLiveServices {
    static BASEURL: string;
    constructor();
    private static get;
    static getClub(token: string, clubId: string): Promise<Club>;
    static getClubMembers(token: string, clubId: string, length: number, offset: number): Promise<ClubMembers>;
    static getCampaigns(token: string, name: string | undefined, length: number, offset: number): Promise<Campaigns>;
    static getMap(token: string, mapUid: string): Promise<Map>;
}
export interface Club {
    id: number;
    name: string;
    tag: string;
    description: string;
    authorAccountId: string;
    iconUrl: string;
    logoUrl: string;
    decalUrl: string;
    screen16x9Url: string;
    decalSponsor4x1Url: string;
    screen8x1Url: string;
    screen16x1Url: string;
    verticalUrl: string;
    backgroundUrl: string;
    creationTimestamp: number;
    popularityLevel: number;
    state: string;
    featured: false;
    walletUid: string;
    metadata: string;
    editionTimestamp: number;
    iconTheme: string;
    decalTheme: string;
    screen16x9Theme: string;
    screen8x1Theme: string;
    screen16x1Theme: string;
    verticalTheme: string;
    backgroundTheme: string;
}
export interface ClubMembers {
    clubMemberList: ClubMember[];
    maxPage: number;
    itemCount: number;
}
export interface ClubMember {
    accountId: string;
    clubId: number;
    role: string;
    creationTimestamp: number;
    vip: boolean;
    moderator: boolean;
    hasFeatured: boolean;
    pin: boolean;
    useTag: boolean;
}
export interface ClubActivities {
    activityList: ClubActivity[];
    maxPage: number;
    itemCount: number;
}
export interface ClubActivity {
    id: number;
    name: string;
    activityType: string;
    activityId: number;
    targetActivityId: number;
    campaignId: number;
    position: number;
    public: true;
    active: true;
    mediaUrl: string;
    externalId: number;
    featured: false;
    password: false;
    itemsCount: number;
    clubId: number;
    editionTimestamp: number;
    mediaTheme: string;
}
export interface Campaigns {
    clubCampaignList: Campaign[];
    maxPage: number;
    itemCount: number;
}
export interface Campaign {
    clubDecalUrl: string;
    campaignId: number;
    activityId: number;
    mediaUrl: string;
    campaign: {
        id: number;
        seasonUid: string;
        name: string;
        clubId: number;
        leaderboardGroupUid: string;
        published: true;
        playlist: {
            id: number;
            position: number;
            mapUid: string;
        }[];
    };
    popularityLevel: number;
    publicationTimestamp: number;
    creationTimestamp: number;
    id: number;
    clubId: number;
    clubName: string;
    name: string;
    mapsCount: number;
}
export interface Map {
    uid: string;
    mapId: string;
    name: string;
    author: string;
    submitter: string;
    authorTime: number;
    goldTime: number;
    silverTime: number;
    bronzeTime: number;
    nbLaps: number;
    valid: boolean;
    downloadUrl: string;
    thumbnailUrl: string;
}
