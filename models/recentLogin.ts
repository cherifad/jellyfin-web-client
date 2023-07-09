import User from "@/models/user";

export default class RecentLogin {
    serverId: string;
    users: User[];
    constructor(pServerId: string, pUsers: User[]) {
        this.serverId = pServerId;
        this.users = pUsers;
    }

    public removeUser(pAccountID: string) {
        const index = this.users.findIndex((user) => user.accountID === pAccountID);
        if (index > -1) {
            this.users.splice(index, 1);
        }
    }
}