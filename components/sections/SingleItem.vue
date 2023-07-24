<template>
  <div class="h-fit px-3">
    <div class="relative rounded-xl h-52 bg-cover thumbnails" :style="{ backgroundImage: `url(${imgLink})` }">
      <div v-if="itemFirstGenre !== ''"
        class="absolute target top-1 left-1 backdrop-blur-3xl font-semibold rounded-full px-3 py-1">
        {{ itemFirstGenre }}
      </div>
    </div>
    <!-- <div
      class="relative rounded-xl h-4/5 bg-cover "
      :style="{ backgroundImage: `url(${imgLink})` }"
    >
    <ImageBlock crossorigin="Anonymous" :src="imgLink" class="w-full h-full thumbnails rounded-xl" alt="yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy">
      <div
        v-if="itemFirstGenre !== ''"
        class="absolute target top-1 left-1 backdrop-blur-3xl font-semibold rounded-full px-3 py-1"
      >
        {{ itemFirstGenre }}
      </div>
    </div> -->
    <NuxtLink :to="link" class="flex justify-between h-1/5 pt-3 cursor-pointer">
      <h1 class="text-xl font-semibold">{{ itemTitle }}</h1>
      <ArrowSmallRightIcon class="h-6 w-6 group-hover:translate-x-1 transition-transform" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { ArrowSmallRightIcon } from "@heroicons/vue/24/solid";
import slugify from "@sindresorhus/slugify";
import { useConfigStore } from "@/stores/useConfig";

const config = useConfigStore();

const props = defineProps({
  autoPlay: {
    type: Boolean,
    required: false,
    default: false,
  },
  autoPlaySpeed: {
    type: Number,
    required: false,
    default: 3000,
  },
  itemFirstGenre: {
    type: String,
    required: true,
  },
  itemImg: {
    type: String,
    required: true,
  },
  itemTitle: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
});

// onMounted(() => {
//   // Check all elements with a .target class against all images on a page
//   BackgroundCheck.init({
//     targets: ".target",
//   });

//   // Specific images
//   BackgroundCheck.init({
//     targets: ".target",
//     images: ".thumbnails",
//   });
// });

const imgLink = computed(() => {
  return `${config.selectedServerValue.url}/Items/${props.itemId}/Images/Backdrop?fillHeight=300&fillWidth=450&tag=${props.itemImg}`;
});

const link = computed(() => {
  return `/media/${slugify(props.itemTitle)}_${props.itemId}`;
});
</script>
