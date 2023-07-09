<template>
    <div class="h-96 w-72 p-5 bg-cover flex flex-col justify-end rounded-lg"
        :style="{ backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.1), rgba(17, 17, 17, 1)), url(${posterUrl})` }">
        <h1 class="text-white text-5xl font-thin">{{ peopleName }}</h1>
        <h2 class="text-white text-lg font-semibold">{{ peopleRole }}</h2>
    </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfig";

const config = useConfigStore();

const props = defineProps({
    peopleName: {
        type: String,
        required: true,
    },
    peopleRole: {
        type: String,
        required: true,
    },
    peopleId: {
        type: String,
        required: true,
    },
    peopleImageTag: {
        type: String,
        required: false,
    }
});

const posterUrl = computed(() => {
    if (props.peopleImageTag) {
        return `${config.selectedServerValue.url}/Items/${props.peopleId}/Images/Primary?maxHeight=500&tag=${props.peopleImageTag}`;
    } else {
        return "https://via.placeholder.com/300x500";
    }
});
</script>