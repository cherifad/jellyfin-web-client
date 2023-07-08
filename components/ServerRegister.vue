<template>
    <div class="h-full flex flex-col items-center">
        <FormInput v-model="serverUrl" placeholder="Server URL" />
        <FormButton @click="register">
            <span v-if="!checkingServerUrl">Register</span>
            <ArrowPathIcon v-else class="h-8 animate-spin w-8" />
        </FormButton>
        <div v-if="error" class="text-red-500">Invalid server URL</div>
    </div>
</template>

<script setup lang="ts">
import { checkServerUrl } from '@/api/auth';
import { useConfigStore } from '@/stores/useConfig';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

const serverUrl = ref("");
const checkingServerUrl = ref(false);
const error = ref(false)

const configStore = useConfigStore();

const register = async () => {
    checkingServerUrl.value = true;
    const serverUrlIsValid = await checkServerUrl(serverUrl.value);
    if (serverUrlIsValid) {
        configStore.addServerUrl(serverUrl.value);
    } else {
        error.value = true;
        setTimeout(() => {
            error.value = false;
        }, 5000);
    }
    checkingServerUrl.value = false;
};
</script>