<template>
  <PopUp
    :showModal="showModal"
    :modal-title="$t('server_register_title')"
    :user-can-close="configStore.serversCount > 0"
    @close="(e) => null"
  >
    <div class="h-full flex flex-col items-center">
      <FormInput v-model="serverUrl" :defaultValue="serverUrl" :placeholder="$t('server_URL')" />
      <FormButton @click="register">
        <span v-if="!checkingServerUrl">{{ $t('add_server') }}</span>
        <ArrowPathIcon v-else class="h-8 animate-spin w-8" />
      </FormButton>
      <div v-if="error" class="text-red-500">{{ $t('invalid_server_URL') }}</div>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
import { checkServerUrl } from "@/api/auth";
import { useConfigStore } from "@/stores/useConfig";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

const serverUrl = ref("https://");
const checkingServerUrl = ref(false);
const error = ref(false);

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false,
        required: true
    }
})

const configStore = useConfigStore();

const emit = defineEmits(["close"]);

const register = async () => {
  if (!serverUrl.value.match(urlRegex)) {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 5000);
    return
  }
  checkingServerUrl.value = true;
  const serverUrlIsValid = await checkServerUrl(serverUrl.value);
  if (serverUrlIsValid) {
    configStore.addServer(serverUrl.value, serverUrlIsValid.data.Id, serverUrlIsValid.data.ServerName);
    emit("close", false);
  } else {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 5000);
  }
  checkingServerUrl.value = false;
};
</script>
