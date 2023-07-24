<template>
  <div class="flex flex-col justify-between pb-5">
    <div class="flex flex-col gap-4">
      <ul class="flex gap-2 flex-wrap">
        <li v-for="genre in genres" :key="genre" class="bg-gray-700 rounded-full px-2 py-1">
          {{ genre }}
        </li>
      </ul>
      <h1 class="text-6xl font-semibold">{{ name }}</h1>
      <div class="flex gap-3 items-center">
        <ImageBlock src="@/assets/img/IMDB_Logo.svg" class="w-20" alt="" />
        <span class="text-xl font-semibold">{{
          Math.round(communityRating * 10) / 10
        }}</span>
      </div>
    </div>
    <div class="flex gap-3 items-center">
      <div class="bg-white p-3 rounded-lg w-fit text-black">
        <HeartIcon class="h-8 w-8" />
      </div>
      <p>Add to favorite</p>
    </div>
    <p v-if="overview" class="text-gray-400 font-semibold">
      {{ limitText(overview, 400) }}
      <span v-if="textLimited" class="text-blue-500 cursor-pointer" @click="showFullText = true">Show more</span>
      <PopUp @close="showFullText = false" :show-modal="showFullText" :modalTitle="'Overview - ' + name">
        {{ overview }}
      </PopUp>
    </p>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/solid";
import { text } from "stream/consumers";

const textLimited = ref(false)
const showFullText = ref(false)
const textLimit = ref(0)

const props = defineProps({
  overview: {
    type: String,
    required: true,
  },
  genres: {
    type: Array<string>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  communityRating: {
    type: Number,
    required: true,
  },
});

function limitText(text: string, limit: number) {
  textLimit.value = limit
  if (text.length > limit) {
    textLimited.value = true
    return text.substring(0, limit) + "...";
  } else {
    textLimited.value = false
    return text;
  }
}
</script>
