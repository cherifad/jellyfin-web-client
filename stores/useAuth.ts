import { login, logout } from "@/api/auth";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useConfigStore } from "@/stores/useConfig";
import JellyfinApi from "@/api";

export const useAuthStore = defineStore("auth", () => {
  const avatarId = useLocalStorage("avatarId", "");
  const serverId = useLocalStorage("serverId", "");
  const accessToken = useLocalStorage("accessToken", "");
  const username = useLocalStorage("username", "");
  const accountID = useLocalStorage("accountID", "");
  
  const authenticated = computed(() => { return accessToken.value !== ""; });
  const accessTokenValue = computed(() => accessToken.value);
  const userIdValue = computed(() => accountID.value);

  const storeLogin = async (pUsername: string, pPassword: string) => {
    console.log("storeLogin");
    const res: any = await login(pUsername, pPassword);
    if (res.data.AccessToken) {
      avatarId.value = res.data.User.PrimaryImageTag;
      serverId.value = res.data.ServerId;
      accessToken.value = res.data.AccessToken;
      username.value = res.data.User.Name;
      accountID.value = res.data.User.Id;
      JellyfinApi.destroyInstance();
      JellyfinApi.getInstance(useConfigStore().selectedServerUrlValue, accessToken.value);
    }
  };

  const storeLogout = async () => {
    console.log("storeLogout");
    await logout();
    avatarId.value = "";
    serverId.value = "";
    accessToken.value = "";
    username.value = "";
  };

  return {
    authenticated,
    accessTokenValue,
    userIdValue,
    storeLogin,
    storeLogout,
  };
});
