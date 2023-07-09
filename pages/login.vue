<template>
  <!-- Login Page -->
  <div class="py-7 px-20 flex flex-col h-screen">
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-7xl font-light mb-4">Welcome back!</h1>
    </div>
    <!-- Recent Logins -->
    <div v-if="recentLoginStore.recentLoginsValue.length > 0" class="flex flex-col items-center">
      <div class="w-3/5">
        <div class="flex items-center gap-5 mt-10">
          <h1 class="text-3xl font-bold mb-2">Recent Logins</h1>
          <p class="text-xl flex gap-2 items-center hover:text-[#ed5a45] font-bold cursor-pointer"
            @click="recentLoginStore.removeAllRecentLogins">
            <TrashIcon class="w-6 h-6" />
            Remove all
          </p>
        </div>
        <div class="flex flex-col mt-2">
          <div class="flex flex-wrap gap-4">
            <AccountCard v-for="recentLogin in recentLoginStore.recentLoginsValue" :key="recentLogin.accountId"
              :username="recentLogin.username" :imageId="recentLogin.avatarId" :account-id="recentLogin.accountID" />
            <div
              class="relative bg-[#ed5a45] rounded-lg text-white px-8 pt-5 pb-3 flex flex-col items-center justify-between">
              <div class="rounded-full w-20 h-20 bg-[#ff9384] shadow-sm shadow-black flex items-center justify-center">
                <PlusIcon :alt="username + ' profile image'" class="w-8 h-8" />
              </div>
              <p class="text-lg font-bold mt-3 text-center">{{ $t('add_account') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Login Form -->
    <div class="bg-[#f4f1eb] flex-1 rounded-3xl p-7 text-black flex flex-col items-center justify-center mt-7">
      <!-- Login Form Fields -->
      <div class="flex gap-10 justify-center w-full">
        <div class="w-1/4">
          <input placeholder="username" type="text" v-model="form.username"
            class="mb-4 w-full px-7 py-3 border-black border-2 outline-none bg-transparent rounded-xl" />
          <div class="flex gap-3 items-center">
            <button type="button"
              class="bg-transparent w-7 h-7 rounded-lg border-black border-2 flex items-center justify-center focus:outline-none text-black"
              @click="rememberMe = !rememberMe">
              <CheckIcon v-if="rememberMe" class="w-5 h-5" />
            </button>
            <span class="font-bold">Remember me {{ rememberMe }}</span>
          </div>
        </div>
        <div class="w-1/4">
          <div class="flex items-center pr-3 mb-4 border-black border-2 outline-none bg-transparent rounded-xl">
            <input placeholder="password" :type="showPassword ? 'text' : 'password'" v-model="form.password"
              class="pl-7 py-3 flex-1 bg-transparent outline-none rounded-xl" />
            <EyeIcon v-if="!showPassword" class="h-6 w-6 cursor-pointer" @click="showPassword = true" />
            <EyeSlashIcon v-else class="h-6 w-6 cursor-pointer" @click="showPassword = false" />
          </div>
          <div class="">
            <p @click="showLostPasswordModal = true" class="font-bold underline cursor-pointer">
              Forgot password?
            </p>
          </div>
        </div>
      </div>
      <!-- Login Button -->
      <div class="w-1/4 mt-3">
        <button type="button" class="bg-black w-full py-3 rounded-xl text-white font-bold" @click="login()">
          Login
          <ArrowRightOnRectangleIcon class="h-5 w-5 inline-block" />
        </button>
        <button type="button" class="bg-red-500 mt-3 w-full py-3 rounded-xl text-white font-bold"
          @click="showServerChoiceModal = true">
          Change server
          <ArrowsRightLeftIcon class="h-5 w-5 inline-block" />
        </button>
      </div>
    </div>
    {{ showNewServerModal }}
    <!-- Lost Password Modal -->
    <PopUp modalTitle="Test" :showModal="showLostPasswordModal" :key="showLostPasswordModal"
      @close="(e) => (showLostPasswordModal = e)">
      <h1>Test</h1>
      <button>salut</button>
      <EyeSlashIcon class="h-6 w-6 cursor-pointer" />
      <div class="mt-4">
        <button type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="showLostPasswordModal = false">
          Got it, thanks!
        </button>
      </div>
    </PopUp>
  </div>
  <!-- Server Choice Modal -->
  <ServerRegister :showModal="showNewServerModal" @close="showNewServerModal = false" />
  <!-- Server list choice -->
  <ServerSelector :showModal="showServerChoiceModal" @close="showServerChoiceModal = false" />
</template>

<script setup>
import { useRecentLoginStore } from "@/stores/useRecentLogin";
import { useConfigStore } from "@/stores/useConfig";
import { useAuthStore } from "@/stores/useAuth";
import {
  EyeSlashIcon,
  EyeIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon,
  ArrowsRightLeftIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
import JellyfinApi from "@/api";

const configStore = useConfigStore();
const recentLoginStore = useRecentLoginStore();
const authStore = useAuthStore();

const form = ref({
  username: "",
  password: "",
});
const showPassword = ref(false);
const rememberMe = ref(false);
const showLostPasswordModal = ref(false);
const showServerChoiceModal = ref(false);
const showNewServerModal = ref(false);

onMounted(async () => {
  JellyfinApi.destroyInstance();
  JellyfinApi.getInstance(
    configStore.selectedServerValue.url,
    authStore.accessToken
  );
  if (configStore.serversCount <= 0) {
    showNewServerModal.value = true;
  }
});

const canLogin = computed(() => {
  return form.value.username.length > 0 && form.value.password.length > 0;
});

watch(() => configStore.serversCount, (count) => {
  // show new server modal if no server is configured
  if (!showNewServerModal.value && count <= 0) {
    console.log("show");
    showNewServerModal.value = true;
  }
});

definePageMeta({
  layout: "unauthenticated",
  middleware: ["not-auth"],
});

async function login() {
  if (canLogin.value) {
    await authStore.storeLogin(form.value.username, form.value.password);
    if (authStore.authenticated) {
      navigateTo("/");
    }
  }
}
</script>
