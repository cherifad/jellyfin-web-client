<template>
    <div class="relative">
        <TrashIcon class="absolute top-0 right-0 w-6 h-6 text-white cursor-pointer" @click="recentLoginStore.removeRecentLogin(props.accountId)" />
        <EllipsisVerticalIcon class="absolute top-0 right-0 w-6 h-6 text-white cursor-pointer" />
        <div>
            <img :src="imgLink" :alt="username + ' profile image'" class="rounded-full w-24 h-24">
        </div>
        <span class="text-white text-2xl">{{ username }}</span>
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
    return `${configStore.serverUrl}/Users/${props.accountId}/Images/Primary?tag=${props.imageId}`
})
</script>