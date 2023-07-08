import { useAuthStore } from '@/stores/useAuth';
import { useConfigStore } from '@/stores/useConfig';
import JellyfinApi from '@/api';

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    const configStore = useConfigStore();
    
    JellyfinApi.destroyInstance();
    JellyfinApi.getInstance(configStore.selectedServerUrlValue, authStore.accessTokenValue, authStore.userIdValue);
});