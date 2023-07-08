<template>
    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="4"
      :loop="true"
      :autoplay="{
        delay: 2000,
        pauseOnMouseEnter: true,
      }"
    >
      <SwiperSlide v-for="item in latestMovies" :key="item.Id">
        <SectionsSingleItem
          class=""
          :key="item.Id"
          :item-title="item.Name"
          :item-img="
            item.ParentBackdropImageTags
              ? item.ParentBackdropImageTags[0]
              : item.BackdropImageTags[0]
          "
          :item-id="
            item.ParentBackdropItemId ? item.ParentBackdropItemId : item.Id
          "
          :item-first-genre="item.Genres[0] ? item.Genres[0] : ''"
        ></SectionsSingleItem>
      </SwiperSlide>
    </Swiper>
  </template>

<script setup>
import { getLatest, ItemType } from '@/api/common';

const latestMovies = ref([]);

onMounted(async () => {
  const res = await getLatest(
    "db4c1708cbb5dd1676284a40f2950aba",
    ItemType.Movie,
  );
  latestMovies.value = res.data;
  console.log(latestMovies.value);
});
</script>