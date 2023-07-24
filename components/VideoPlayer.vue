<template>
  <vue-plyr>
    <div v-if="isYoutubeVideo" class="plyr__video-embed w-3/5 h-fit">
      <iframe
        :src="
          'https://www.youtube.com/embed/' +
          extractYoutubeVideoId(videoUrl) +
          '?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
        "
        allowfullscreen
        allowtransparency
        allow="autoplay"
        class="w-full h-3/5"
      ></iframe>
    </div>
    <video
    v-else
      controls
      :crossorigin="isYoutubeVideo ? 'anonymous' : ''"
      playsinline
      :data-poster="videoThumbnail ? videoThumbnail : ''"
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>
  </vue-plyr>
</template>

<script setup lang="ts">
import { extractYoutubeVideoId } from '@/utils';

const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
  videoThumbnail: {
    required: false,
  },
});

const isYoutubeVideo = computed(() => {
  return props.videoUrl.includes('youtube');
});
</script>

<style lang="css">
/* set --plyr-color-main to red */
html {
  --plyr-color-main: red;
}
</style>
