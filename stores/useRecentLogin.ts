import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

class RecentLogin {
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

export const useRecentLoginStore = defineStore("recentLogin", () => {
    const recentLogins = useLocalStorage<RecentLogin[]>(`recentLogins`, []);

    const recentLoginsValue = computed(() => recentLogins.value);

    const addRecentLogin = (pUsername: string, pAccountID: string, pAccessToken: string, pAvatarId: string, pServerId: string) => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.accountID === pAccountID);
        if (index > -1) {
            recentLogins.value[index].accessToken = pAccessToken;
            recentLogins.value[index].username = pUsername;
        } else {
            recentLogins.value.push(new RecentLogin(pUsername, pAccountID, pAccessToken, pAvatarId, pServerId));
        }
    };

    const removeRecentLogin = (pAccountID: string) => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.accountID === pAccountID);
        if (index > -1) {
            recentLogins.value.splice(index, 1);
        }
    };

    const removeAllRecentLogins = () => {
        recentLogins.value = [];
    };

    const getRecentLogins = () => {
        return recentLogins.value;
    };

    return {
        recentLoginsValue,
        addRecentLogin,
        removeRecentLogin,
        getRecentLogins,
        removeAllRecentLogins,
    };
});