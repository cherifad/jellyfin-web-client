import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import JellyfinApi from "@/api";

export const useConfigStore = defineStore("config", () => {
  const serversUrl = useLocalStorage<string[]>("serversUrl", []);
  const selectedServerUrl = useLocalStorage<string>("selectedServerUrl", "");

  const serversCount = computed(() => serversUrl.value.length);
  const serversUrlList = computed(() => serversUrl.value);
  const selectedServerUrlValue = computed(() => selectedServerUrl.value);

  function addServerUrl(pServerUrl: string) {
    const index = serversUrl.value.findIndex(
      (serverUrl) => serverUrl === pServerUrl
    );
    if (index > -1) {
      serversUrl.value[index] = pServerUrl;
    } else {
      serversUrl.value.push(pServerUrl);
    }
    selectedServerUrl.value = pServerUrl;
    JellyfinApi.destroyInstance();
  }

  function removeServerUrl(pServerUrl: string) {
    const index = serversUrl.value.findIndex(
      (serverUrl) => serverUrl === pServerUrl
    );
    if (index > -1) {
      serversUrl.value.splice(index, 1);
    }
    if (selectedServerUrl.value === pServerUrl) {
      selectedServerUrl.value = "";
    }
  }

  function getServersUrl(): string[] {
    return serversUrl.value;
  }

  return {
    addServerUrl,
    removeServerUrl,
    getServersUrl,
    serversCount,
    serversUrlList,
    selectedServerUrlValue,
  };
});
