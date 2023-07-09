import { login, logout } from "@/api/auth";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useConfigStore } from "@/stores/useConfig";
import { useRecentLoginStore } from "@/stores/useRecentLogin";
import User from "@/models/user";
import JellyfinApi from "@/api";

export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage<User>("user", new User("", "", "", "", ""));
  
  const authenticated = computed(() => { return user.value.accessToken !== ""; });
  const accessTokenValue = computed(() => user.value.accessToken);
  const userIdValue = computed(() => user.value.accountID);

  const storeLogin = async (pUsername: string, pPassword: string) => {
    console.log("storeLogin");
    const res: any = await login(pUsername, pPassword);
    if (res.data.AccessToken) {
      user.value = new User(pUsername, res.data.User.Id, res.data.AccessToken, res.data.User.PrimaryImageTag, res.data.ServerId);
      useRecentLoginStore().addRecentLogin(pUsername, res.data.User.Id, res.data.AccessToken, res.data.User.PrimaryImageTag, res.data.ServerId);
      JellyfinApi.destroyInstance();
      JellyfinApi.getInstance(useConfigStore().selectedServerValue.url, user.value.accessToken);
    }
  };

  const storeLogout = async () => {
    console.log("storeLogout");
    await logout();
    user.value = new User("", "", "", "", "");
  };

  return {
    authenticated,
    accessTokenValue,
    userIdValue,
    storeLogin,
    storeLogout,
  };
});
