import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import JellyfinApi from "@/api";
import Server from "@/models/server";

export const useConfigStore = defineStore("config", () => {
  const servers = useLocalStorage<Server[]>("servers", []);
  const selectedServer = useLocalStorage<Server>("selectedServer", {
    url: "",
    id: "",
  });

  watch(
    () => selectedServer.value,
    () => {
      JellyfinApi.destroyInstance();
    }
  );

  const serversCount = computed(() => servers.value.length);
  const serversList = computed(() => servers.value);
  const selectedServerValue = computed(() => selectedServer.value);

  function addServer(pServer: string, pServerId: string) {
    const index = servers.value.findIndex((server) => server.url === pServer);
    // If server already exists, update the id
    if (index > -1) {
      servers.value[index].id = pServerId;
    } else {
      // If server doesn't exist, add it
      servers.value.push(new Server(pServer, pServerId));
      // If no server is selected, select the one just added
      if (selectedServer.value.id === "") {
        setSelectedServer(pServerId);
      }
    }
  }

  function removeServer(pServerId: string) {
    const index = servers.value.findIndex((server) => server.id === pServerId);
    if (index > -1) {
      servers.value.splice(index, 1);
    }
  }

  function setSelectedServer(pServerId: string) {
    const index = servers.value.findIndex((server) => server.id === pServerId);
    if (index > -1) {
      selectedServer.value = servers.value[index];
    } else {
      selectedServer.value = { url: "", id: "" };
    }
  }

  return {
    addServer,
    removeServer,
    setSelectedServer,
    serversCount,
    serversList,
    selectedServerValue,
  };
});
