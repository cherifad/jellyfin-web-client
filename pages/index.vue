<template>
  <HomeCaroussel />
  <SectionsSectionContainer title="Continue Watching" link="/continue-watching">
    <SectionsResumeWatchingSlider />
  </SectionsSectionContainer>
  <SectionsSectionContainer class="mt-5" title="Studios" link="/studios">
    <SectionsStudios />
  </SectionsSectionContainer>
  <SectionsSectionContainer class="mt-5" title="Latest Movies" link="/movies">
    <SectionsLatestMoviesSlider />
  </SectionsSectionContainer>
  <p>hello</p>
  <input type="text" v-model="searchTerms" @input="executeSearch" placeholder="search here..." name="" id=""
    class="text-black" />
  <h1>Home page</h1>
  <Swiper :modules="[SwiperAutoplay]" :slides-per-view="3" :space-between="30" :loop="true" :autoplay="{
        delay: 2000,
        disableOnInteraction: true,
      }">
    <SwiperSlide v-for="result in test.Items" :key="result.Id">
      {{ result.Name }}
      <!-- <ImageBlock
        :src="`jellyfin/Items/${result.Id}/Images/Primary?fillHeight=300&fillWidth=450`"
        :alt="`testImg ${result.Id}`"
      /> -->
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { search } from "@/api/search";

definePageMeta({
  layout: "home"
});

const test = ref("");
const searchTerms = ref("");

async function executeSearch() {
  console.log("searching...");
  if (searchTerms.value != "") {
    console.log("searching for: " + searchTerms.value);
    const res = await search(
      searchTerms.value,
      10
    );
    test.value = res.data;
  }
}
</script>
