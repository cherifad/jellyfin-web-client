<template>
  <div class="flex items-center justify-between p-3 text-white">
    <div class="flex items-center gap-6">
      <Bars3Icon class="h-8 w-8" />
      <ul class="flex items-center gap-6">
        <li>Movie</li>
        <li>TV Show</li>
        <li>{{ $t("welcome") }}</li>
      </ul>
    </div>
    <NuxtLink :to="localePath('/')" class="font-bold text-xl"
      >Adlen Flix</NuxtLink
    >
    <div class="flex items-center gap-6">
      <MagnifyingGlassIcon class="h-8 w-8" />
      <BellIcon class="h-8 w-8" />
      <div class="flex items-center gap-2">
        <Menu as="div" class="relative inline-block text-left z-10">
          <div>
            <MenuButton
              class="inline-flex items-center w-full justify-center rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <div class="w-10 h-10 rounded-full bg-white"></div>
              <ChevronDownIcon
                class="-mr-1 h-8 w-8 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="logout()"
                  >
                    <ArrowLeftOnRectangleIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                    {{ $t("logout") }}
                    <Confirmation />
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/vue/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/20/solid";
import { useAuthStore } from "@/stores/useAuth";

const authStore = useAuthStore();
const localePath = useLocalePath();

const showConfirmation = ref(false);
const result = ref(false);

function logout() {
    if(confirm("Are you sure you want to logout?")) {
        authStore.storeLogout();
    }
}
</script>
