import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import RecentLogin from "@/models/recentLogin";
import User from "@/models/user";

export const useRecentLoginStore = defineStore("recentLogin", () => {
    const recentLogins = useLocalStorage<RecentLogin[]>(`recentLogins`, []);

    const recentLoginsValue = computed(() => recentLogins.value);

    const addRecentLogin = (pUser: User, pServerId: string ) => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.serverId === pServerId);
        if (index > -1) {
            // check if user already exists
            const userIndex = recentLogins.value[index].users.findIndex((user) => user.accountID === pUser.accountID);
            if (userIndex > -1) {
                recentLogins.value[index].users.splice(userIndex, 1);
            }
            recentLogins.value[index].users.push(pUser);
        } else {
            recentLogins.value.push(new RecentLogin(pServerId, [pUser]));
        }
    };

    const removeRecentLogin = (pAccountID: string, pServerId: string) => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.serverId === pServerId);
        if (index > -1) {
            console.log(recentLogins.value[index])
            recentLogins.value[index].removeUser(pAccountID);
            // remove server if no users left
            if (recentLogins.value[index].users.length === 0) {
                recentLogins.value.splice(index, 1);
            }
        }
    };

    const removeAllRecentLogins = () => {
        recentLogins.value = [];
    };

    const getRecentLogins = () => {
        return recentLogins.value;
    };

    const getUsersForServer = (pServerId: string) => {
        const index = recentLogins.value.findIndex((recentLogin) => recentLogin.serverId === pServerId);
        if (index > -1) {
            return recentLogins.value[index].users;
        }
        return [];
    };

    return {
        recentLoginsValue,
        getUsersForServer,
        addRecentLogin,
        removeRecentLogin,
        getRecentLogins,
        removeAllRecentLogins,
    };
});