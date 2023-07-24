<template>
    <NuxtLink :to="localePath(`/person/${slugify(people.name)}_${people.id}`)" class="h-96 w-72 p-5 bg-cover flex flex-col justify-end rounded-lg"
        :style="{ backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.1), rgba(17, 17, 17, 1)), url(${posterUrl})` }">
        <h1 class="text-white text-5xl font-thin">{{ people.name }}</h1>
        <h2 class="text-white text-lg font-semibold">{{ peopleRole }}</h2>
    </NuxtLink>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfig";
import slugify from "@sindresorhus/slugify";
import People from "@/models/people";

const localePath = useLocalePath();

const config = useConfigStore();

const props = defineProps({
    people: {
        type: People,
        required: true,
    },
    peopleRole: {
        type: String,
        required: true,
    }
});

const posterUrl = computed(() => {
    if (props.people.primaryImageTag) {
        return `${config.selectedServerValue.url}/Items/${props.people.id}/Images/Primary?maxHeight=500&tag=${props.people.primaryImageTag}`;
    } else {
        return "https://via.placeholder.com/300x500";
    }
});
</script>