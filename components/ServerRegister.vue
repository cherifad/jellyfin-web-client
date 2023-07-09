<template>
  <PopUp
    :showModal="showModal"
    :modal-title="$t('server_register_title')"
    @close="(e) => null"
  >
    <div class="h-full flex flex-col items-center">
      <FormInput v-model="serverUrl" :placeholder="$t('server_URL')" />
      <FormButton @click="register">
        <span v-if="!checkingServerUrl">Register</span>
        <ArrowPathIcon v-else class="h-8 animate-spin w-8" />
      </FormButton>
      <div v-if="error" class="text-red-500">Invalid server URL</div>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
import { checkServerUrl } from "@/api/auth";
import { useConfigStore } from "@/stores/useConfig";
import { ArrowPathIcon } from "@heroicons/vue/24/solid";

const serverUrl = ref("");
const checkingServerUrl = ref(false);
const error = ref(false);

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
  checkingServerUrl.value = true;
  const serverUrlIsValid = await checkServerUrl(serverUrl.value);
  if (serverUrlIsValid) {
    configStore.addServer(serverUrl.value, serverUrlIsValid.data.Id);
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
