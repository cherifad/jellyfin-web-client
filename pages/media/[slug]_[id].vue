<template>
  <div v-if="itemDetails" class="px-7">
    <div class="flex justify-between">
      <div class="flex gap-4 w-3/5">
        <img :src="posterUrl" class="rounded-lg" alt="dd" />
        <MediaDetailsItemDetails
          :overview="itemDetails.Overview"
          :genres="itemDetails.Genres"
          :name="itemDetails.Name"
          :communityRating="itemDetails.CommunityRating"
        />
      </div>
      <div class="w-2/5 flex justify-end">
        <div class="h-fit overflow-hidden p-5 w-3/5">
          <vue-plyr v-if="itemDetails.RemoteTrailers.length > 0">
            <div class="plyr__video-embed w-3/5 h-fit">
              <iframe
                :src="
                  'https://www.youtube.com/embed/' +
                  extractYoutubeVideoId(itemDetails.RemoteTrailers[0].Url) +
                  '?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
                "
                allowfullscreen
                allowtransparency
                allow="autoplay"
                class="w-full h-3/5"
              ></iframe>
            </div>
          </vue-plyr>
        </div>
      </div>
    </div>
    <!-- cast -->
    <div class="mt-10">
      <div class="mb-5 flex justify-between items-center">
        <h1 class="text-5xl font-light">Cast</h1>
        <div class="flex">
          <ChevronLeftIcon
            class="h-6 w-6 cursor-pointer"
            @click="changeSlide(false)"
          />
          <ChevronRightIcon
            class="h-6 w-6 cursor-pointer"
            @click="changeSlide(true)"
          />
        </div>
      </div>
      <swiper
        :spaceBetween="30"
        :modules="[SwiperAutoplay]"
        :slidesPerView="6"
        :autoplay="{ delay: 2000, pauseOnMouseEnter: true }"
        ref="swiperRef"
      >
        <swiper-slide v-for="cast in itemDetails.People" :key="cast.Id">
          <SinglePeople
            :key="cast.Id"
            :peopleName="cast.Name"
            :peopleRole="cast.Role"
            :peopleImageTag="cast.PrimaryImageTag"
            :peopleId="cast.Id"
          />
        </swiper-slide>
      </swiper>
    </div>
    <!-- recommendations -->
    <div class="mt-10">
      <div class="mb-5 flex justify-between items-center">
        <h1 class="text-5xl font-light">Recommendations</h1>
        <div class="flex">
          <ChevronLeftIcon
            class="h-6 w-6 cursor-pointer"
            @click="changeSlide(false)"
          />
          <ChevronRightIcon
            class="h-6 w-6 cursor-pointer"
            @click="changeSlide(true)"
          />
        </div>
      </div>
      <swiper
        :spaceBetween="30"
        :modules="[SwiperAutoplay]"
        :slidesPerView="4"
        :autoplay="{ delay: 2000, pauseOnMouseEnter: true }"
        ref="swiperRef"
      >
        <swiper-slide
          v-for="recommendation in recommendations"
          :key="recommendation.Id"
        >
          <SectionsSingleItem
            :key="recommendation.Id"
            :item-title="recommendation.Name"
            :item-img="recommendation.BackdropImageTags[0]"
            :item-id="recommendation.Id"
            :item-first-genre="recommendation.Genres[0]"
          />
        </swiper-slide>
      </swiper>
    </div>
    <div class="p-2 my-10 rounded-lg bg-pink-500 sticky bottom-3 z-30 flex items-center gap-3 flex-wrap">
        <div class="bg-white flex items-center gap-2 text-black rounded-lg p-4 group cursor-pointer">
            <PlayIcon class="h-8 w-8 group-hover:scale-125 transition-transform" />
            <span class="group-hover:scale-110 transition-transform">{{ itemDetails.UserData.PlaybackPositionTicks ? `Resume at ${ticksToHoursAndMinutes(itemDetails.UserData.PlaybackPositionTicks).minutes}` : 'Play'}}</span>
        </div>
        <h1 class="text-white font-semibold text-lg">{{ itemDetails.Name }}</h1>
        <div>
            <span v-if="itemDetails.UserData.LastPlayedDate" class="flex gap-2">
                <ClockIcon class="h-6 w-6 text-white" />
                Last played:
                {{ toLocaleDateString(new Date(itemDetails.UserData.LastPlayedDate)) }}
            </span>
        </div>
        <p>{{ ticksToHoursAndMinutes(itemDetails.RunTimeTicks) }}</p>
        <p>{{ endAt(itemDetails.RunTimeTicks) }}</p>
        <p class="flex items-center gap-1" v-if="lang.subtitleLanguages.length > 0">
            <ChatBubbleBottomCenterTextIcon class="h-6 w-6 mr-3" /> 
            <span v-for="subtitle in lang.subtitleLanguages">
                <img class="w-8 h-8 rounded-full" :src="subtitle.img" :alt="subtitle.Name">
            </span>
        </p>
        <p class="flex items-center gap-1" v-if="lang.audioLanguages.length > 0">
            <SpeakerWaveIcon class="h-6 w-6 mr-3" /> 
            <span v-for="audio in lang.audioLanguages">
                <img class="w-8 h-8 rounded-full" :src="audio.img" :alt="audio.Name">
            </span>
        </p>
        <p>{{ itemDetails.UserData }}</p>
    </div>
  </div>
  <div v-else class="h-screen flex flex-1 justify-center items-center">
    <div
      class="flex gap-3 text-black bg-white px-4 py-2 font-semibold w-fit rounded-md items-center"
    >
      <ArrowPathIcon class="h-8 animate-spin w-8" />
      Fetching data...
    </div>
  </div>
</template>

<script setup>
import { getItemDetails, getRecommendations } from "@/api/common";
import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  SpeakerWaveIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
} from "@heroicons/vue/24/outline";
import { extractYoutubeVideoId, ticksToHoursAndMinutes, endAt, getAudioSubtitleLanguages, toLocaleDateString, getLocalImage } from "@/utils";
import { useConfigStore } from "@/stores/useConfig";
import SwiperClass from "swiper";

const itemDetails = ref(null);
const recommendations = ref(null);
const posterUrl = ref(null);
const backdropUrl = ref(null);
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const config = useConfigStore();
const swiperRef = ref(null);
const lang = ref(null);

const id = computed(() => route.params.id);

// function initSwiper() {
//   const swiper = new SwiperClass(swiperRef.value, {
//     slidesPerView: 6,
//     spaceBetween: 30,
//     slidesPerGroup: 6,
//     loop: true,
//     loopFillGroupWithBlank: true,
//     autoplay: {
//       delay: 2000,
//       pauseOnMouseEnter: true,
//     },
//     breakpoints: {
//       1024: {
//         slidesPerView: 6,
//         spaceBetween: 30,
//         slidesPerGroup: 6,
//       },
//       768: {
//         slidesPerView: 4,
//         spaceBetween: 30,
//         slidesPerGroup: 4,
//       },
//       640: {
//         slidesPerView: 3,
//         spaceBetween: 20,
//         slidesPerGroup: 3,
//       },
//       320: {
//         slidesPerView: 2,
//         spaceBetween: 10,
//         slidesPerGroup: 2,
//       },
//     },
//   });

//   console.log(swiper);

//   swiperRef.value.$swiper = swiper;
// }

// function changeSlide(next) {
//   if (next) {
//     swiperRef.value.$swiper.slideNext();
//   } else {
//     swiperRef.value.$swiper.slidePrev();
//   }
// }

async function getDetails() {
  const res = await getItemDetails(
    id.value
  );
  itemDetails.value = res.data;
  posterUrl.value = `${config.selectedServerUrlValue}/Items/${itemDetails.value.Id}/Images/Primary?maxHeight=500&tag=${itemDetails.value.ImageTags.Primary}`;
  backdropUrl.value = `${config.selectedServerUrlValue}/api/v1/GetImage/${runtimeConfig.apiKey}/${itemDetails.value.ImageTags.Backdrop}?width=300`;

  lang.value = getAudioSubtitleLanguages(itemDetails.value.MediaSources[0].MediaStreams);

  const recommendationsRes = await getRecommendations(id.value);
  recommendations.value = recommendationsRes.data.Items;
}

onMounted(async () => {
  await getDetails();
  useHead({
  title: itemDetails.value.Name,
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  });
});
</script>
