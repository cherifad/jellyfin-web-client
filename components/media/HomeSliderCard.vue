<template>
  <div class="min-h-[70vh] p-7 bg-cover flex items-end gap-5 text-white bg-opacity-75" :style="{
    backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.5), rgba(17, 17, 17, 1)), url(${imageURL})`,
  }">
    <div class="w-3/5 flex flex-col gap-3">
      <div class="rounded-full bg-red-500 w-fit px-3 py-1 backdrop-blur-sm">
        {{ tip }} {{ Type }}
      </div>
      <h1 class="text-8xl font-bold">{{ title }}</h1>
      <p class="text-xl">{{ resume }}</p>
      <div class="flex gap-3 z-30">
        <button class="bg-white flex gap-2 text-black rounded-full px-9 py-3 font-bold">
          <PlayIcon class="h-6 w-6" />
          Play
        </button>
        <NuxtLink :to="`/media/${slugify(title)}_${itemId}`"
          class="border-white flex gap-2 border-[.5px] rounded-full px-9 py-3 font-bold group">
          More
          <ArrowSmallRightIcon class="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { PlayIcon, ArrowSmallRightIcon } from "@heroicons/vue/24/solid";
import slugify from "@sindresorhus/slugify";
import { useConfigStore } from "@/stores/useConfig";

const props = defineProps({
  backImage: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    required: false,
    default: "New",
  },
  audio: {
    type: String,
    required: false,
  },
  Type: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
});

const config = useConfigStore();

const imageURL = computed(() => {
  return `${config.selectedServerValue.url}/Items/${props.itemId}/Images/Backdrop?tag=${props.backImage}`;
});
</script>
