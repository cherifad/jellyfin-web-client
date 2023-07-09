<template>
  <div class="p-1 w-1/6 h-40">
    <div class="border-[1px] h-full border-white bg-white p-2 rounded-lg">
      <div class="rounded-lg h-full bg-cover" :style="{ backgroundImage: `url(${imgLink})` }"></div>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/useConfig';

const config = useConfigStore();

const props = defineProps({
  studioId: {
    type: String,
    required: true,
  },
  studioImgTag: {
    type: String,
    required: true,
  },
});

const imgLink = computed(() => {
  return `${config.selectedServerValue.url}/Items/${props.studioId}/Images/Thumb?tag=${props.studioImgTag}`;
});
</script>