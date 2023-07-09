<template>
    <div class="relative bg-white rounded-lg text-black px-8 pt-5 pb-3 flex flex-col items-center justify-between">
        <TrashIcon class="absolute top-1 left-1 text-red-500 w-6 h-6 cursor-pointer" @click="recentLoginStore.removeRecentLogin(props.accountId)" />
        <EllipsisVerticalIcon class="absolute top-0 right-0 w-6 h-6 cursor-pointer" />
        <div>
            <img :src="imgLink" :alt="username + ' profile image'" class="rounded-full w-24 h-24 shadow-sm shadow-black">
        </div>
        <p class="text-lg font-bold mt-3 text-center">{{ username }}</p>
    </div>
</template>

<script setup lang="ts">
import { TrashIcon, EllipsisVerticalIcon } from '@heroicons/vue/24/solid';
import { useConfigStore } from '@/stores/useConfig';
import { useRecentLoginStore } from '@/stores/useRecentLogin';

const configStore = useConfigStore();
const recentLoginStore = useRecentLoginStore();

const props = defineProps({
    username: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    }
})

const imgLink = computed(() => {
    return `${configStore.selectedServerUrlValue}/Users/${props.accountId}/Images/Primary?tag=${props.imageId}`
})
</script>