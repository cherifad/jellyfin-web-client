export default class User {
    username: string;
    accountID: string;
    accessToken: string;
    avatarId: string;
    serverId: string;
    constructor(pUsername: string, paccountID: string, pAccessToken: string, pAvatarId: string, pServerId: string) {
        this.username = pUsername;
        this.accountID = paccountID;
        this.accessToken = pAccessToken;
        this.avatarId = pAvatarId;
        this.serverId = pServerId;
    }
}