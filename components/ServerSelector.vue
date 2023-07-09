<template>
    <PopUp @close="closePopUp" :show-modal="showModal" :modal-title="$t('server_list_title')">
        <ul>
            <li v-for="server in config.serversList">
                <button
                    @click="config.setSelectedServer(server.id)"
                    :class="{'bg-red-300 p-3': server.id === config.selectedServerValue.id}"
                    class="flex gap-2 items-center w-full text-left justify-between"
                >
                    <span class="flex-1">{{ server.url }}</span>
                    <TrashIcon class="h-5 w-5 hover:text-[#ed5a45]" @click="config.removeServer(server.id)" />
                </button>
            </li>
        </ul>
    </PopUp>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/useConfig';
import { TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
})

const config = useConfigStore();

const emit = defineEmits(["close"]);

watch(() => config.serversCount, () => {
    if (config.serversCount === 0) {
        closePopUp();
    }
})

function closePopUp() {
    emit("close", false);
}
</script>