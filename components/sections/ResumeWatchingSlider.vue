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
    <SwiperSlide v-for="item in resume" :key="item.Id">
      <SectionsSingleItem
        class=""
        :key="item.Id"
        :item-title="item.Name"
        :grab-cursor="true"
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
import { getResume } from "@/api/common";

const resume = ref([]);

onMounted(async () => {
  const res = await getResume(
    "db4c1708cbb5dd1676284a40f2950aba",
    10
  );
  resume.value = res.data.Items;
  console.log(resume.value);
});
</script>
