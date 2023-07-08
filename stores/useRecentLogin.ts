import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

class RecentLogin {
    username: string;
    accountID: string;
    accessToken: string;
    constructor(pUsername: string, paccountID: string, pAccessToken: string = "") {
        this.username = pUsername;
        this.accountID = paccountID;
        this.accessToken = pAccessToken;
    }
}

export const useRecentLoginStore = defineStore("recentLogin", () => {
    const recentLogins = useLocalStorage<RecentLogin[]>(`recentLogins`, []);

    const addRecentLogin = (pUsername: string, pAccountID: string, pAccessToken: string = "") => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.accountID === pAccountID);
        if (index > -1) {
            recentLogins.value[index].accessToken = pAccessToken;
            recentLogins.value[index].username = pUsername;
        } else {
            recentLogins.value.push(new RecentLogin(pUsername, pAccountID, pAccessToken));
        }
    };

    const removeRecentLogin = (pAccountID: string) => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.accountID === pAccountID);
        if (index > -1) {
            recentLogins.value.splice(index, 1);
        }
    };

    const getRecentLogins = () => {
        return recentLogins.value;
    };

    return {
        recentLogins,
        addRecentLogin,
        removeRecentLogin,
        getRecentLogins,
    };
});